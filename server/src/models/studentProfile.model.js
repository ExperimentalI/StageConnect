import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  //Presonnal information
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: Date,
  profilePicture: String, //URL

  //Address
  address: {
    street: String,
    city: String,
    zipCode: String,
    country: { type: String, default: "Ivory Cost" },
  },

  //Formation
  education: {
    institution: String,
    degree: {
      type: String,
      enum: ["Licence", "Master", "Ingeneer", "BTS", "Other"],
    },
    field: { type: String }, //Informatics, Marketing ...,
    currentYear: Number,
    expectedGraduation: Date,
    gpa: Number,
  },

  //Competences
  skills: [String],
  languages: [
    {
      language: String,
      level: {
        type: String,
        enum: ["Débutant", "Intermediaire", "Avancé", "Natif"],
      },
    },
  ],
  cv: {
    filename: String,
    url: String,
    uploadedAt: Date,
  },
  portfolio: String, //URL

  //Stage Preferences
  internShipPreferences: {
    field: [String], //Domaine d'interet
    location: [String], //Ville preferé
    startDate: Date,
    duration: {
      type: Number,
      min: 3,
      max: 12,
    }, //Mois
    workType: {
      type: String,
      enum: ["Présentiel", "Télétravail", "Hybride"],
      default: "Présentiel",
    },
  },
  bio: { type: String, maxlength: 500 },
  isProfileComplete: { type: Boolean, default: false },
  uploadedAt: { type: Date, default: Date.now },
});

export const StudentProfile = mongoose.model(
  "StudentProfile",
  studentProfileSchema,
);
