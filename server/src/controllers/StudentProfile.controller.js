import { StudentProfile } from "../models/studentProfile.model.js";
import { User } from "../models/user.model.js";
import { Candidature } from "../models/application.model.js";
import { InternShip } from "../models/internShip.model.js";

class StudentProfileController {
  static async createProfile(req, res) {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);

      if (!user || user.role !== "student") {
        return res
          .status(403)
          .json({ error: "Only students can create student profiles" });
      }

      const existingProfile = await StudentProfile.findOne({ userId });
      if (existingProfile) {
        return res.status(400).json({ error: "Profile already exists" });
      }

      const profileData = { ...req.body, userId };
      const profile = await StudentProfile.create(profileData);

      user.profile = profile._id;
      await user.save();

      res.status(201).json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getProfile(req, res) {
    try {
      const profile = await StudentProfile.findOne({
        userId: req.user._id,
      }).populate("userId", "email role isVerified");

      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateProfile(req, res) {
    try {
      const profile = await StudentProfile.findOneAndUpdate(
        { userId: req.user._id },
        req.body,
        { new: true, runValidators: true },
      ).populate("userId", "email role isVerified");

      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteProfile(req, res) {
    try {
      const profile = await StudentProfile.findOneAndDelete({
        userId: req.user._id,
      });

      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      await User.findByIdAndUpdate(req.user._id, { $unset: { profile: 1 } });

      res.json({ message: "Profile deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getProfileById(req, res) {
    try {
      const profile = await StudentProfile.findById(req.params.id).populate(
        "userId",
        "email role isVerified",
      );

      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async uploadCV(req, res) {
    try {
      const { filename, url } = req.body;

      const profile = await StudentProfile.findOneAndUpdate(
        { userId: req.user._id },
        {
          cv: { filename, url, uploadedAt: new Date() },
          isProfileComplete: true,
        },
        { new: true },
      );

      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async uploadProfilePicture(req, res) {
    try {
      const { filename, url } = req.body;

      const profile = await StudentProfile.findOneAndUpdate(
        { userId: req.user._id },
        { profilePicture: url },
        { new: true },
      );

      if (!profile) {
        return res.status(404).json({ error: "Profile not found" });
      }

      res.json(profile);
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
        .populate("internshipId", "title company field location")
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

  static async getApplicationById(req, res) {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);

      if (!user || user.role !== "student") {
        return res
          .status(403)
          .json({ error: "Only students can view their applications" });
      }

      const studentProfile = await StudentProfile.findOne({ userId });

      const application = await Candidature.findOne({
        _id: req.params.id,
        studentId: studentProfile._id,
      }).populate("internshipId", "title company field location");

      if (!application) {
        return res.status(404).json({ error: "Application not found" });
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

  static async searchProfiles(req, res) {
    try {
      const { skills, field, city, educationLevel } = req.query;
      let filter = {};

      if (skills) {
        filter.skills = { $in: skills.split(",") };
      }

      if (field) {
        filter["education.field"] = field;
      }

      if (city) {
        filter["address.city"] = city;
      }

      if (educationLevel) {
        filter["education.degree"] = educationLevel;
      }

      const profiles = await StudentProfile.find(filter)
        .populate("userId", "email isVerified")
        .select("-cv");

      res.json(profiles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default StudentProfileController;
