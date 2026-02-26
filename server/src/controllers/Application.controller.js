import { Candidature } from "../models/application.model.js";
import { InternShip } from "../models/internShip.model.js";
import { StudentProfile } from "../models/studentProfile.model.js";
import { Company } from "../models/companyProfile.model.js";
import { User } from "../models/user.model.js";
import {
  generateApplicationEmail,
  sendEmail,
  generateInterviewEmail,
} from "../utils/email.js";

class ApplicationController {
  static async createApplication(req, res) {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);

      if (!user || user.role !== "student") {
        return res
          .status(403)
          .json({ error: "Only students can apply for internships" });
      }

      const studentProfile = await StudentProfile.findOne({ userId });
      if (!studentProfile) {
        return res.status(400).json({ error: "Student profile required" });
      }

      const { internshipId, coverLetter, customCV } = req.body;

      const internship = await InternShip.findById(internshipId);
      if (!internship) {
        return res.status(404).json({ error: "Internship not found" });
      }

      if (internship.status !== "active") {
        return res
          .status(400)
          .json({ error: "Internship is not accepting applications" });
      }

      if (internship.currentApplicants >= internship.maxApplicants) {
        return res
          .status(400)
          .json({ error: "Internship has reached maximum applicants" });
      }

      const existingApplication = await Candidature.findOne({
        internshipId,
        studentId: studentProfile._id,
      });

      if (existingApplication) {
        return res
          .status(400)
          .json({ error: "You have already applied for this internship" });
      }

      const application = await Candidature.create({
        internshipId,
        studentId: studentProfile._id,
        coverLetter,
        customCV,
        appliedAt: new Date(),
      });

      await InternShip.findByIdAndUpdate(internshipId, {
        $inc: { currentApplicants: 1 },
      });

      const populatedApplication = await Candidature.findById(application._id)
        .populate("internshipId", "title field location duration workType")
        .populate("studentId", "firstName lastName email");

      const companyProfile = await Company.findById(internship.companyId);
      if (companyProfile) {
        try {
          const emailData = generateApplicationEmail(
            populatedApplication.studentId,
            populatedApplication.internshipId,
            companyProfile,
          );
          await sendEmail(emailData);
        } catch (error) {}
      }

      res.status(201).json(populatedApplication);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getStudentApplications(req, res) {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);

      if (!user || user.role !== "student") {
        return res
          .status(403)
          .json({ error: "Only students can view their applications" });
      }

      const studentProfile = await StudentProfile.findOne({ userId });
      if (!studentProfile) {
        return res.status(404).json({ error: "Student profile not found" });
      }

      const { status, page = 1, limit = 10 } = req.query;
      let filter = { studentId: studentProfile._id };

      if (status) {
        filter.status = status;
      }

      const skip = (page - 1) * limit;

      const applications = await Candidature.find(filter)
        .populate(
          "internshipId",
          "title company field location compensation workType",
        )
        .sort({ appliedAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await Candidature.countDocuments(filter);

      res.json({
        applications,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getCompanyApplications(req, res) {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);

      if (!user || user.role !== "company") {
        return res.status(403).json({
          error: "Only companies can view applications for their internships",
        });
      }

      const companyProfile = await Company.findOne({ userId });
      if (!companyProfile) {
        return res.status(404).json({ error: "Company profile not found" });
      }

      const { status, internshipId, page = 1, limit = 10 } = req.query;

      let internshipFilter = { companyId: companyProfile._id };
      if (internshipId) {
        internshipFilter._id = internshipId;
      }

      const internships = await InternShip.find(internshipFilter).select("_id");
      const internshipIds = internships.map((internship) => internship._id);

      let filter = { internshipId: { $in: internshipIds } };
      if (status) {
        filter.status = status;
      }

      const skip = (page - 1) * limit;

      const applications = await Candidature.find(filter)
        .populate("internshipId", "title field location")
        .populate(
          "studentId",
          "firstName lastName email phone education skills",
        )
        .sort({ appliedAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await Candidature.countDocuments(filter);

      res.json({
        applications,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateApplicationStatus(req, res) {
    try {
      const { status, companyNotes, feedback } = req.body;
      const userId = req.user._id;
      const user = await User.findById(userId);

      if (!user || user.role !== "company") {
        return res
          .status(403)
          .json({ error: "Only companies can update application status" });
      }

      const companyProfile = await Company.findOne({ userId });

      const internship = await InternShip.findOne({
        companyId: companyProfile._id,
      });
      if (!internship) {
        return res
          .status(404)
          .json({ error: "No internships found for this company" });
      }

      const application = await Candidature.findOneAndUpdate(
        {
          _id: req.params.id,
          internshipId: {
            $in: await InternShip.find({
              companyId: companyProfile._id,
            }).select("_id"),
          },
        },
        {
          status,
          companyNotes,
          feedback,
          statusUpdatedAt: new Date(),
          reviewedAt: new Date(),
        },
        { new: true, runValidators: true },
      )
        .populate("internshipId", "title company")
        .populate("studentId", "firstName lastName email");

      if (!application) {
        return res
          .status(404)
          .json({ error: "Application not found or unauthorized" });
      }

      try {
        const emailData = generateInterviewEmail(
          application.studentId,
          application.internshipId,
          application.interview,
        );
        await sendEmail(emailData);
      } catch (error) {}

      res.json(application);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async scheduleInterview(req, res) {
    try {
      const { date, type, location, notes } = req.body;
      const userId = req.user._id;
      const user = await User.findById(userId);

      if (!user || user.role !== "company") {
        return res
          .status(403)
          .json({ error: "Only companies can schedule interviews" });
      }

      const companyProfile = await Company.findOne({ userId });

      const application = await Candidature.findOneAndUpdate(
        {
          _id: req.params.id,
          internshipId: {
            $in: await InternShip.find({
              companyId: companyProfile._id,
            }).select("_id"),
          },
        },
        {
          status: "interview",
          interview: {
            scheduled: true,
            date: new Date(date),
            type,
            location,
            notes,
          },
          statusUpdatedAt: new Date(),
        },
        { new: true, runValidators: true },
      )
        .populate("internshipId", "title company")
        .populate("studentId", "firstName lastName email");

      if (!application) {
        return res
          .status(404)
          .json({ error: "Application not found or unauthorized" });
      }

      res.json(application);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async withdrawApplication(req, res) {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);

      if (!user || user.role !== "student") {
        return res
          .status(403)
          .json({ error: "Only students can withdraw their applications" });
      }

      const studentProfile = await StudentProfile.findOne({ userId });

      const application = await Candidature.findOneAndUpdate(
        { _id: req.params.id, studentId: studentProfile._id },
        {
          status: "withdrawn",
          statusUpdatedAt: new Date(),
        },
        { new: true },
      ).populate("internshipId", "title");

      if (!application) {
        return res
          .status(404)
          .json({ error: "Application not found or unauthorized" });
      }

      await InternShip.findByIdAndUpdate(application.internshipId._id, {
        $inc: { currentApplicants: -1 },
      });

      res.json({ message: "Application withdrawn successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getApplicationById(req, res) {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);

      let application;

      if (user.role === "student") {
        const studentProfile = await StudentProfile.findOne({ userId });
        application = await Candidature.findOne({
          _id: req.params.id,
          studentId: studentProfile._id,
        });
      } else if (user.role === "company") {
        const companyProfile = await Company.findOne({ userId });
        application = await Candidature.findOne({
          _id: req.params.id,
          internshipId: {
            $in: await InternShip.find({
              companyId: companyProfile._id,
            }).select("_id"),
          },
        });
      }

      if (!application) {
        return res
          .status(404)
          .json({ error: "Application not found or unauthorized" });
      }

      const populatedApplication = await Candidature.findById(application._id)
        .populate(
          "internshipId",
          "title company field location compensation workType description",
        )
        .populate(
          "studentId",
          "firstName lastName email phone education skills cv portfolio",
        );

      res.json(populatedApplication);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getApplicationStats(req, res) {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);

      if (user.role === "student") {
        const studentProfile = await StudentProfile.findOne({ userId });

        const stats = await Candidature.aggregate([
          { $match: { studentId: studentProfile._id } },
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
            },
          },
        ]);

        const totalApplications = await Candidature.countDocuments({
          studentId: studentProfile._id,
        });

        res.json({ stats, totalApplications });
      } else if (user.role === "company") {
        const companyProfile = await Company.findOne({ userId });

        const stats = await Candidature.aggregate([
          {
            $lookup: {
              from: "internships",
              localField: "internshipId",
              foreignField: "_id",
              as: "internship",
            },
          },
          { $unwind: "$internship" },
          { $match: { "internship.companyId": companyProfile._id } },
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
            },
          },
        ]);

        const totalApplications = await Candidature.aggregate([
          {
            $lookup: {
              from: "internships",
              localField: "internshipId",
              foreignField: "_id",
              as: "internship",
            },
          },
          { $unwind: "$internship" },
          { $match: { "internship.companyId": companyProfile._id } },
          { $count: "total" },
        ]);

        res.json({
          stats,
          totalApplications: totalApplications[0]?.total || 0,
        });
      } else {
        res.status(403).json({ error: "Unauthorized" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default ApplicationController;
