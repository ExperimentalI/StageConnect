# Architecture Plateforme de Stages - MVP

## 🏗️ Architecture Technique

### Stack MERN

```
Frontend: React 18 + Vite + Tailwind CSS
Backend: Node.js + Express.js
Base de données: MongoDB + Mongoose
Authentification: JWT + bcryptjs
Storage: Multer (local) → Cloudinary (production)
Email: Nodemailer + Gmail SMTP
```

### Structure du Projet

```
internship-platform/
├── 📁 client/                    # React Frontend
│   ├── 📁 public/
│   ├── 📁 src/
│   │   ├── 📁 components/        # Composants réutilisables
│   │   │   ├── 📁 ui/           # Boutons, inputs, etc.
│   │   │   ├── 📁 layout/       # Header, Footer, Sidebar
│   │   │   └── 📁 forms/        # Formulaires spécifiques
│   │   ├── 📁 pages/            # Pages principales
│   │   │   ├── 📁 auth/         # Login, Register
│   │   │   ├── 📁 student/      # Dashboard étudiant
│   │   │   ├── 📁 company/      # Dashboard entreprise
│   │   │   └── 📁 public/       # Pages publiques
│   │   ├── 📁 hooks/            # Custom hooks
│   │   ├── 📁 context/          # Context API
│   │   ├── 📁 services/         # API calls
│   │   └── 📁 utils/            # Helpers
│   └── 📄 package.json
├── 📁 server/                    # Node.js Backend
│   ├── 📁 models/               # Schémas MongoDB
│   ├── 📁 routes/               # Routes API
│   ├── 📁 controllers/          # Logique métier
│   ├── 📁 middleware/           # Middlewares
│   ├── 📁 utils/                # Helpers backend
│   ├── 📁 uploads/              # Fichiers temporaires
│   └── 📄 server.js
└── 📄 README.md
```

## 🗄️ Modèles de Données MongoDB

### 1. User (Base commune)

```javascript
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["student", "company"],
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLogin: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
```

### 2. StudentProfile

```javascript
const studentProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  // Informations personnelles
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: Date,
  profilePicture: String, // URL

  // Adresse
  address: {
    street: String,
    city: { type: String, required: true },
    zipCode: String,
    country: { type: String, default: "Côte d'Ivoire" },
  },

  // Formation
  education: {
    institution: { type: String, required: true },
    degree: {
      type: String,
      enum: ["Licence", "Master", "Ingénieur", "BTS", "Autre"],
      required: true,
    },
    field: { type: String, required: true }, // Informatique, Marketing, etc.
    currentYear: Number,
    expectedGraduation: Date,
    gpa: Number,
  },

  // Compétences et documents
  skills: [String],
  languages: [
    {
      language: String,
      level: {
        type: String,
        enum: ["Débutant", "Intermédiaire", "Avancé", "Natif"],
      },
    },
  ],
  cv: {
    filename: String,
    url: String,
    uploadedAt: Date,
  },
  portfolio: String, // URL

  // Préférences de stage
  internshipPreferences: {
    fields: [String], // Domaines d'intérêt
    locations: [String], // Villes préférées
    startDate: Date,
    duration: {
      type: Number,
      min: 1,
      max: 12,
    }, // mois
    workType: {
      type: String,
      enum: ["Présentiel", "Télétravail", "Hybride"],
      default: "Présentiel",
    },
  },

  bio: { type: String, maxlength: 500 },
  isProfileComplete: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
});
```

### 3. CompanyProfile

```javascript
const companyProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  // Informations entreprise
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
```

### 4. Internship (Offres de stage)

```javascript
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
```

### 5. Application (Candidatures)

```javascript
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
```

## 🛠️ Architecture Backend (Express.js)

### Routes API Structure

```javascript
// 🔐 Authentication Routes
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh-token
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
POST   /api/auth/verify-email

// 👤 User Management
GET    /api/users/profile
PUT    /api/users/profile
DELETE /api/users/account
POST   /api/users/change-password
POST   /api/users/upload-avatar

// 🎓 Student Routes
GET    /api/students/profile
PUT    /api/students/profile
POST   /api/students/upload-cv
GET    /api/students/applications
GET    /api/students/recommendations

// 🏢 Company Routes
GET    /api/companies/profile
PUT    /api/companies/profile
POST   /api/companies/upload-logo
GET    /api/companies/internships
GET    /api/companies/applications

// 💼 Internship Routes
GET    /api/internships              // Public - avec filtres
GET    /api/internships/:id          // Public - détails
POST   /api/internships              // Company only
PUT    /api/internships/:id          // Company only
DELETE /api/internships/:id          // Company only
PATCH  /api/internships/:id/status   // Company only

// 📋 Application Routes
POST   /api/applications             // Student only
GET    /api/applications/:id         // Student/Company
PUT    /api/applications/:id/status  // Company only
DELETE /api/applications/:id         // Student only (withdraw)

// 🔍 Search & Filters
GET    /api/search/internships
GET    /api/search/companies
GET    /api/filters/fields
GET    /api/filters/locations
```

### Middleware Stack

```javascript
// ✅ Security & Validation
app.use(helmet()); // Sécurité headers
app.use(cors(corsOptions)); // CORS configuré
app.use(rateLimit(rateLimitOptions)); // Rate limiting
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// 🔐 Authentication Middleware
const authenticateToken = (req, res, next) => {
  // JWT verification
};

const authorizeRole = (roles) => (req, res, next) => {
  // Role-based access control
};

// 📝 Validation Middleware
const validateRequest = (schema) => (req, res, next) => {
  // Express-validator ou Joi
};
```

## ⚛️ Architecture Frontend (React)

### Structure des Composants

```javascript
// 🎨 UI Components (Design System)
components/ui/
├── Button.jsx
├── Input.jsx
├── Card.jsx
├── Modal.jsx
├── Loading.jsx
└── Toast.jsx

// 🏗️ Layout Components
components/layout/
├── Header.jsx
├── Footer.jsx
├── Sidebar.jsx
└── DashboardLayout.jsx

// 📋 Form Components
components/forms/
├── StudentProfileForm.jsx
├── CompanyProfileForm.jsx
├── InternshipForm.jsx
└── ApplicationForm.jsx

// 💼 Feature Components
components/internship/
├── InternshipCard.jsx
├── InternshipList.jsx
├── SearchFilters.jsx
└── ApplicationStatus.jsx
```

### Pages Structure

```javascript
// 🔐 Authentication Pages
pages/auth/
├── Login.jsx
├── Register.jsx
├── ForgotPassword.jsx
└── VerifyEmail.jsx

// 🎓 Student Pages
pages/student/
├── Dashboard.jsx
├── Profile.jsx
├── SearchInternships.jsx
├── MyApplications.jsx
└── InternshipDetails.jsx

// 🏢 Company Pages
pages/company/
├── Dashboard.jsx
├── Profile.jsx
├── ManageInternships.jsx
├── CreateInternship.jsx
└── Applications.jsx

// 🌐 Public Pages
pages/public/
├── Home.jsx
├── About.jsx
├── Browse.jsx
└── InternshipPublic.jsx
```

### Context API

```javascript
// 🔐 AuthContext
const AuthContext = {
  user: null,
  token: null,
  login: (credentials) => {},
  logout: () => {},
  register: (userData) => {},
  isAuthenticated: false,
};

// 👤 UserContext
const UserContext = {
  profile: null,
  updateProfile: (data) => {},
  uploadDocument: (file) => {},
  isProfileComplete: false,
};

// 💼 InternshipContext
const InternshipContext = {
  internships: [],
  filters: {},
  searchInternships: (query) => {},
  applyToInternship: (id) => {},
  myApplications: [],
};
```

## 🚀 Fonctionnalités MVP

### ✅ Phase 1 - Core Features

**Étudiants:**

- Inscription/Connexion
- Profil complet avec CV
- Recherche de stages (filtres de base)
- Candidature simple
- Tableau de bord des candidatures

**Entreprises:**

- Inscription/Connexion
- Profil entreprise
- Création d'offres de stage
- Gestion des candidatures reçues
- Tableau de bord

**Commun:**

- Interface responsive
- Notifications email de base
- Sécurité JWT

### 🔄 Phase 2 - Améliorations

- Recherche avancée avec géolocalisation
- Système de notifications en temps réel
- Chat basique entre étudiants/entreprises
- Statistiques pour entreprises
- Export des candidatures

### 🎯 Phase 3 - Features Avancées

- Recommandations IA
- Système d'évaluation
- Calendrier d'entretiens
- API mobile
- Intégrations universités

## 🛡️ Sécurité & Performance

### Sécurité

```javascript
// ✅ Authentification JWT sécurisée
// ✅ Hash des mots de passe (bcrypt)
// ✅ Validation des données (express-validator)
// ✅ Rate limiting par IP
// ✅ Upload de fichiers sécurisé
// ✅ Protection CSRF
// ✅ Headers de sécurité (Helmet)
```

### Performance

```javascript
// ✅ Pagination des listes
// ✅ Indexation MongoDB
// ✅ Cache des requêtes fréquentes
// ✅ Compression des réponses
// ✅ Optimisation des images
// ✅ Lazy loading React
```

## 📱 Déploiement

### Environnements

```
Développement: Local (MongoDB Community)
Test: MongoDB Atlas (cluster gratuit)
Production:
  - Frontend: Vercel/Netlify
  - Backend: Railway/Heroku
  - DB: MongoDB Atlas
  - Files: Cloudinary
```

### Variables d'environnement

```bash
# Backend (.env)
PORT=5000
MONGODB_URI=mongodb://localhost:27017/internship-platform
JWT_SECRET=your-super-secret-key
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CLOUDINARY_URL=cloudinary://...

# Frontend (.env)
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=StageConnect
```

Cette architecture vous donne une base solide pour démarrer votre MVP tout en permettant une évolution progressive vers une plateforme plus complète !
