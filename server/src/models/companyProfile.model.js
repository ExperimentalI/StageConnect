import mongoose from "mongoose";

const companyProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },

  //Information Entreprise
  companyName: { type: String, required: true },
  industry: {
    type: String,
    required: true,
    enum: ["IT/Tech", "Marketing", "Finance", "Santé", "Education", "Autre"],
  },
  companySize: {
    type: String,
    enum: ["1-10", "11-50", "51-200", "201-500", "500+"],
    required: true,
  },
  foundedYear: Number,
  website: String,
  logo: String, // URL

  // Description
  description: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  mission: String,

  // Adresse
  headquarters: {
    street: String,
    city: { type: String, required: true },
    zipCode: String,
    country: { type: String, default: "Côte d'Ivoire" },
  },

  // Contact
  contactPerson: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    position: String,
    phone: String,
    email: String,
  },

  // Réseaux sociaux
  socialLinks: {
    linkedin: String,
    facebook: String,
    twitter: String,
  },

  isVerified: { type: Boolean, default: false },
  isProfileComplete: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
});

export const Company = mongoose.model("Company", companyProfileSchema);
