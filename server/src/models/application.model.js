import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  internshipId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Internship",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudentProfile",
    required: true,
  },

  // Candidature
  coverLetter: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  customCV: String, // URL si CV personnalisé pour cette candidature

  // Suivi
  status: {
    type: String,
    enum: [
      "pending",
      "reviewing",
      "shortlisted",
      "interview",
      "accepted",
      "rejected",
      "withdrawn",
    ],
    default: "pending",
  },

  // Notes et feedback
  companyNotes: String, // Notes privées de l'entreprise
  feedback: String, // Feedback pour l'étudiant

  // Timeline
  appliedAt: { type: Date, default: Date.now },
  reviewedAt: Date,
  statusUpdatedAt: Date,

  // Interview (si applicable)
  interview: {
    scheduled: Boolean,
    date: Date,
    type: {
      type: String,
      enum: ["Présentiel", "Visioconférence", "Téléphone"],
    },
    location: String,
    notes: String,
  },
});

// Index composé pour éviter les candidatures multiples
applicationSchema.index({ internshipId: 1, studentId: 1 }, { unique: true });

export const Candidature = mongoose.model("Cadidature", applicationSchema);
