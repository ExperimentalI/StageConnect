import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserConnect {
  static async signup(req, res) {
    try {
      const { email, password, role } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await User.create({
        email,
        password: hashedPassword,
        role,
      });

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "7d" },
      );

      res.status(201).json({
        _id: user._id,
        email: user.email,
        role: user.role,
        token,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(401)
          .json({ error: "Email or password is incorrect" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ error: "Email or password is incorrect" });
      }

      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "7d" },
      );

      await User.findByIdAndUpdate(user._id, {
        lasLogin: new Date(),
        isActive: true,
      });

      res.json({
        _id: user._id,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        token,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async logout(req, res) {
    try {
      await User.findByIdAndUpdate(req.user._id, { isActive: false });
      res.clearCookie("x-auth-token").json({ message: "Logout successful" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUser(req, res) {
    try {
      const user = await User.findById(req.user._id)
        .select("-password")
        .populate("profile");

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const { email } = req.body;

      if (email) {
        const existingUser = await User.findOne({
          email,
          _id: { $ne: req.user._id },
        });

        if (existingUser) {
          return res.status(400).json({ error: "Email already in use" });
        }
      }

      const user = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
        runValidators: true,
      })
        .select("-password")
        .populate("profile");

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;

      const user = await User.findById(req.user._id);

      const isCurrentPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password,
      );
      if (!isCurrentPasswordValid) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 12);

      await User.findByIdAndUpdate(req.user._id, {
        password: hashedNewPassword,
      });

      res.json({ message: "Password updated successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteAccount(req, res) {
    try {
      await User.findByIdAndDelete(req.user._id);
      res.json({ message: "Account deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async verifyUser(req, res) {
    try {
      const { userId } = req.params;

      const user = await User.findByIdAndUpdate(
        userId,
        { isVerified: true },
        { new: true },
      ).select("-password");

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUnverifiedUsers(req, res) {
    try {
      const users = await User.find({ isVerified: false })
        .select("-password")
        .sort({ createdAt: 1 });

      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default UserConnect;
