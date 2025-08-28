import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CompanyProfile",
    required: true,
  },

  // Informations de base
  title: { type: String, required: true },
  description: { type: String, required: true },
  responsibilities: [String],
  requirements: [String],

  // Catégorisation
  field: {
    type: String,
    required: true,
    enum: ["Informatique", "Marketing", "Finance", "RH", "Design", "Autre"],
  },
  subField: String, // Développement web, SEO, etc.

  // Modalités
  workType: {
    type: String,
    enum: ["Présentiel", "Télétravail", "Hybride"],
    default: "Présentiel",
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  }, // mois
  startDate: { type: Date, required: true },
  endDate: Date,

  // Localisation
  location: {
    city: { type: String, required: true },
    address: String,
    country: { type: String, default: "Côte d'Ivoire" },
  },

  // Compensation
  compensation: {
    amount: Number,
    currency: { type: String, default: "FCFA" },
    period: {
      type: String,
      enum: ["Mensuel", "Total", "Aucune"],
      default: "Mensuel",
    },
    benefits: [String], // Transport, Repas, etc.
  },

  // Gestion
  maxApplicants: { type: Number, default: 50 },
  currentApplicants: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["draft", "active", "paused", "closed"],
    default: "draft",
  },

  // Compétences requises
  requiredSkills: [String],
  preferredSkills: [String],
  educationLevel: {
    type: String,
    enum: ["Licence", "Master", "Ingénieur", "BTS", "Tout niveau"],
  },

  // Dates importantes
  applicationDeadline: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const InternShip = mongoose.model("InternShip", internshipSchema);
