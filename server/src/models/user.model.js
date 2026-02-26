import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "company"],
      required: true,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: function () {
        return this.role === "student" ? "StudentProfile" : "CompanyProfile";
      },
    },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    lasLogin: Date,
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
