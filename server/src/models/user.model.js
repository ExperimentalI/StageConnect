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
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "StudentProfile" },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    lasLogin: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
