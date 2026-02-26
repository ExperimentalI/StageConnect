import { Company } from "../models/companyProfile.model.js";
import { User } from "../models/user.model.js";
import { InternShip } from "../models/internShip.model.js";
import { Candidature } from "../models/application.model.js";

class CompanyController {
  static async createProfile(req, res) {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);

      if (!user || user.role !== "company") {
        return res
          .status(403)
          .json({ error: "Only companies can create company profiles" });
      }

      const existingProfile = await Company.findOne({ userId });
      if (existingProfile) {
        return res.status(400).json({ error: "Profile already exists" });
      }

      const profileData = { ...req.body, userId };
      const profile = await Company.create(profileData);

      user.profile = profile._id;
      await user.save();

      res.status(201).json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getProfile(req, res) {
    try {
      const profile = await Company.findOne({ userId: req.user._id }).populate(
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

  static async updateProfile(req, res) {
    try {
      const profile = await Company.findOneAndUpdate(
        { userId: req.user._id },
        { ...req.body, updatedAt: new Date() },
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
      const profile = await Company.findOneAndDelete({ userId: req.user._id });

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
      const profile = await Company.findById(req.params.id).populate(
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

  static async searchCompanies(req, res) {
    try {
      const { industry, city, companySize, isVerified } = req.query;
      let filter = {};

      if (industry) {
        filter.industry = industry;
      }

      if (city) {
        filter["headquarters.city"] = city;
      }

      if (companySize) {
        filter.companySize = companySize;
      }

      if (isVerified !== undefined) {
        filter.isVerified = isVerified === "true";
      }

      const companies = await Company.find(filter)
        .populate("userId", "email isVerified")
        .select("-contactPerson.phone -contactPerson.email");

      res.json(companies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async uploadLogo(req, res) {
    try {
      const { logo } = req.body;

      const profile = await Company.findOneAndUpdate(
        { userId: req.user._id },
        { logo, isProfileComplete: true },
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

  static async verifyCompany(req, res) {
    try {
      const { companyId } = req.params;

      const profile = await Company.findByIdAndUpdate(
        companyId,
        { isVerified: true },
        { new: true },
      ).populate("userId", "email role");

      if (!profile) {
        return res.status(404).json({ error: "Company not found" });
      }

      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUnverifiedCompanies(req, res) {
    try {
      const companies = await Company.find({ isVerified: false })
        .populate("userId", "email createdAt")
        .sort({ createdAt: 1 });

      res.json(companies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getCompanyInternships(req, res) {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);

      if (!user || user.role !== "company") {
        return res
          .status(403)
          .json({ error: "Only companies can view their internships" });
      }

      const companyProfile = await Company.findOne({ userId });

      const { status, page = 1, limit = 10 } = req.query;
      let filter = { companyId: companyProfile._id };

      if (status) {
        filter.status = status;
      }

      const skip = (page - 1) * limit;

      const internships = await InternShip.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const total = await InternShip.countDocuments(filter);

      res.json({
        internships,
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
        return res
          .status(403)
          .json({
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
}

export default CompanyController;
