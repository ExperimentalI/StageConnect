import { InternShip } from "../models/internShip.model.js";
import { Company } from "../models/companyProfile.model.js";
import { User } from "../models/user.model.js";

class InternShipController {
  static async createInternship(req, res) {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);
      
      if (!user || user.role !== "company") {
        return res.status(403).json({ error: "Only companies can create internships" });
      }

      const companyProfile = await Company.findOne({ userId });
      if (!companyProfile) {
        return res.status(400).json({ error: "Company profile required" });
      }

      const internshipData = {
        ...req.body,
        companyId: companyProfile._id,
      };

      const internship = await InternShip.create(internshipData);
      
      const populatedInternship = await InternShip.findById(internship._id)
        .populate("companyId", "companyName industry headquarters");

      res.status(201).json(populatedInternship);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getInternships(req, res) {
    try {
      const { 
        field, 
        city, 
        workType, 
        status = "active",
        page = 1, 
        limit = 10 
      } = req.query;
      
      let filter = {};
      
      if (field) {
        filter.field = field;
      }
      
      if (city) {
        filter["location.city"] = city;
      }
      
      if (workType) {
        filter.workType = workType;
      }
      
      if (status) {
        filter.status = status;
      }

      const skip = (page - 1) * limit;
      
      const internships = await InternShip.find(filter)
        .populate("companyId", "companyName industry headquarters logo")
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
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getInternshipById(req, res) {
    try {
      const internship = await InternShip.findById(req.params.id)
        .populate("companyId", "companyName industry headquarters logo description website");
      
      if (!internship) {
        return res.status(404).json({ error: "Internship not found" });
      }

      res.json(internship);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateInternship(req, res) {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);
      
      if (!user || user.role !== "company") {
        return res.status(403).json({ error: "Only companies can update internships" });
      }

      const companyProfile = await Company.findOne({ userId });
      
      const internship = await InternShip.findOneAndUpdate(
        { _id: req.params.id, companyId: companyProfile._id },
        { ...req.body, updatedAt: new Date() },
        { new: true, runValidators: true }
      ).populate("companyId", "companyName industry");

      if (!internship) {
        return res.status(404).json({ error: "Internship not found or unauthorized" });
      }

      res.json(internship);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteInternship(req, res) {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);
      
      if (!user || user.role !== "company") {
        return res.status(403).json({ error: "Only companies can delete internships" });
      }

      const companyProfile = await Company.findOne({ userId });
      
      const internship = await InternShip.findOneAndDelete({
        _id: req.params.id,
        companyId: companyProfile._id
      });

      if (!internship) {
        return res.status(404).json({ error: "Internship not found or unauthorized" });
      }

      res.json({ message: "Internship deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getCompanyInternships(req, res) {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId);
      
      if (!user || user.role !== "company") {
        return res.status(403).json({ error: "Only companies can view their internships" });
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
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateInternshipStatus(req, res) {
    try {
      const { status } = req.body;
      const userId = req.user._id;
      const user = await User.findById(userId);
      
      if (!user || user.role !== "company") {
        return res.status(403).json({ error: "Only companies can update internship status" });
      }

      const companyProfile = await Company.findOne({ userId });
      
      const internship = await InternShip.findOneAndUpdate(
        { _id: req.params.id, companyId: companyProfile._id },
        { status, updatedAt: new Date() },
        { new: true, runValidators: true }
      );

      if (!internship) {
        return res.status(404).json({ error: "Internship not found or unauthorized" });
      }

      res.json(internship);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async searchInternships(req, res) {
    try {
      const { 
        query, 
        field, 
        city, 
        workType, 
        duration,
        educationLevel,
        skills,
        page = 1, 
        limit = 10 
      } = req.query;
      
      let filter = { status: "active" };
      
      if (query) {
        filter.$or = [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } }
        ];
      }
      
      if (field) {
        filter.field = field;
      }
      
      if (city) {
        filter["location.city"] = city;
      }
      
      if (workType) {
        filter.workType = workType;
      }
      
      if (duration) {
        filter.duration = { $lte: parseInt(duration) };
      }
      
      if (educationLevel) {
        filter.educationLevel = educationLevel;
      }
      
      if (skills) {
        const skillsArray = skills.split(',');
        filter.$and = filter.$and || [];
        filter.$and.push({
          $or: [
            { requiredSkills: { $in: skillsArray } },
            { preferredSkills: { $in: skillsArray } }
          ]
        });
      }

      const skip = (page - 1) * limit;
      
      const internships = await InternShip.find(filter)
        .populate("companyId", "companyName industry headquarters logo")
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
          pages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getFeaturedInternships(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 6;
      
      const internships = await InternShip.find({ status: "active" })
        .populate("companyId", "companyName industry headquarters logo")
        .sort({ currentApplicants: -1, createdAt: -1 })
        .limit(limit);

      res.json(internships);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default InternShipController;
