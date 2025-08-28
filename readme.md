# 🎓 StageConnect - Plateforme de Stages

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2016.0.0-brightgreen)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)](https://expressjs.com/)

> Une plateforme moderne qui connecte les étudiants en fin d'études avec les entreprises offrant des opportunités de stage en Côte d'Ivoire et en Afrique de l'Ouest.

## 📋 Table des Matières

- [🎯 Aperçu du Projet](#-aperçu-du-projet)
- [✨ Fonctionnalités](#-fonctionnalités)
- [🛠️ Technologies](#️-technologies)
- [🏗️ Architecture](#️-architecture)
- [🚀 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [📱 Utilisation](#-utilisation)
- [🎨 Captures d'écran](#-captures-décran)
- [🔧 Développement](#-développement)
- [🧪 Tests](#-tests)
- [📦 Déploiement](#-déploiement)
- [🤝 Contribution](#-contribution)
- [📄 Licence](#-licence)

## 🎯 Aperçu du Projet

**StageConnect** est une plateforme web fullstack qui facilite la mise en relation entre :

- **🎓 Étudiants** : Recherche de stages de fin d'études
- **🏢 Entreprises** : Recrutement de stagiaires qualifiés

### Problème résolu

- Difficulté pour les étudiants de trouver des stages adaptés à leur formation
- Processus de recrutement inefficace pour les entreprises
- Manque de visibilité des opportunités de stage en Afrique de l'Ouest

### Solution

- Interface intuitive pour la recherche et publication d'offres
- Système de candidature en ligne simplifié
- Matching intelligent entre profils et opportunités
- Gestion centralisée des candidatures

## ✨ Fonctionnalités

### 👤 Pour les Étudiants

- ✅ **Inscription et profil complet** avec upload de CV
- ✅ **Recherche avancée** par domaine, ville, durée, salaire
- ✅ **Candidature en un clic** avec lettre de motivation
- ✅ **Dashboard personnel** pour suivre les candidatures
- ✅ **Notifications** par email des réponses
- ✅ **Recommandations** basées sur le profil

### 🏢 Pour les Entreprises

- ✅ **Profil entreprise** avec présentation complète
- ✅ **Publication d'offres** avec critères détaillés
- ✅ **Gestion des candidatures** reçues
- ✅ **Filtrage des profils** étudiants
- ✅ **Statistiques** de performance des offres
- ✅ **Communication** directe avec les candidats

### 🔐 Sécurité & Administration

- ✅ **Authentification JWT** sécurisée
- ✅ **Validation des données** côté serveur
- ✅ **Protection des fichiers** uploadés
- ✅ **Rate limiting** anti-spam
- ✅ **Modération** des contenus

## 🛠️ Technologies

### Frontend

- **React 18** - Interface utilisateur moderne
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Framework CSS utility-first
- **React Router** - Navigation côté client
- **React Hook Form** - Gestion des formulaires
- **React Query** - Gestion d'état serveur
- **Axios** - Client HTTP
- **Lucide React** - Icônes modernes

### Backend

- **Node.js** - Runtime JavaScript serveur
- **Express.js** - Framework web minimaliste
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **JWT** - Authentification stateless
- **bcryptjs** - Hashage des mots de passe
- **Multer** - Upload de fichiers
- **Nodemailer** - Envoi d'emails
- **express-validator** - Validation des données

### DevOps & Outils

- **Git** - Contrôle de version
- **ESLint** - Linting JavaScript
- **Prettier** - Formatage du code
- **Cloudinary** - Stockage de fichiers (production)
- **MongoDB Atlas** - Base de données cloud
- **Vercel/Railway** - Déploiement

## 🏗️ Architecture

```
internship-platform/
├── 📁 client/                    # Application React
│   ├── 📁 public/               # Assets statiques
│   ├── 📁 src/
│   │   ├── 📁 components/       # Composants réutilisables
│   │   │   ├── 📁 ui/          # Composants UI de base
│   │   │   ├── 📁 layout/      # Layout components
│   │   │   └── 📁 forms/       # Formulaires
│   │   ├── 📁 pages/           # Pages de l'application
│   │   │   ├── 📁 auth/        # Authentification
│   │   │   ├── 📁 student/     # Interface étudiant
│   │   │   ├── 📁 company/     # Interface entreprise
│   │   │   └── 📁 public/      # Pages publiques
│   │   ├── 📁 hooks/           # Custom React hooks
│   │   ├── 📁 context/         # Context API
│   │   ├── 📁 services/        # Services API
│   │   ├── 📁 utils/           # Fonctions utilitaires
│   │   └── 📄 main.jsx         # Point d'entrée React
│   ├── 📄 package.json
│   ├── 📄 vite.config.js
│   └── 📄 tailwind.config.js
├── 📁 server/                   # API Node.js
│   ├── 📁 controllers/         # Logique métier
│   ├── 📁 models/              # Modèles MongoDB
│   ├── 📁 routes/              # Routes API
│   ├── 📁 middleware/          # Middlewares Express
│   ├── 📁 utils/               # Utilitaires backend
│   ├── 📁 uploads/             # Fichiers temporaires
│   ├── 📄 server.js            # Point d'entrée serveur
│   └── 📄 package.json
├── 📁 docs/                     # Documentation
├── 📄 README.md
├── 📄 .gitignore
└── 📄 docker-compose.yml       # Conteneurisation (optionnel)
```

### Modèles de Données

**Entités principales :**

- `User` - Utilisateurs (étudiants + entreprises)
- `StudentProfile` - Profils étudiants détaillés
- `CompanyProfile` - Profils entreprises
- `Internship` - Offres de stage
- `Application` - Candidatures

## 🚀 Installation

### Prérequis

- **Node.js** >= 16.0.0
- **MongoDB** >= 5.0 (local ou Atlas)
- **Git**
- **npm** ou **yarn**

### 1. Cloner le projet

```bash
git clone https://github.com/votre-username/internship-platform.git
cd internship-platform
```

### 2. Installation des dépendances

**Backend :**

```bash
cd server
npm install
```

**Frontend :**

```bash
cd ../client
npm install
```

### 3. Configuration des variables d'environnement

**Serveur (`server/.env`) :**

```env
# Application
NODE_ENV=development
PORT=5000

# Base de données
MONGODB_URI=mongodb://localhost:27017/stageconnect

# JWT
JWT_SECRET=votre-super-secret-key-très-longue-et-complexe
JWT_EXPIRE=7d

# Email (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre-email@gmail.com
EMAIL_PASS=votre-mot-de-passe-app

# Upload de fichiers
MAX_FILE_SIZE=5000000
UPLOAD_PATH=./uploads

# Cloudinary (production)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

**Client (`client/.env`) :**

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=StageConnect
VITE_APP_VERSION=1.0.0
```

### 4. Démarrage en développement

**Terminal 1 - Backend :**

```bash
cd server
npm run dev
```

**Terminal 2 - Frontend :**

```bash
cd client
npm run dev
```

🎉 **Application disponible sur :**

- Frontend : http://localhost:5173
- Backend API : http://localhost:5000
- API Docs : http://localhost:5000/api-docs (si Swagger activé)

## ⚙️ Configuration

### Base de données MongoDB

**Option 1 : Local**

```bash
# Installation MongoDB Community
# macOS avec Homebrew
brew install mongodb-community

# Démarrage du service
brew services start mongodb-community

# Connexion
mongodb://localhost:27017/stageconnect
```

**Option 2 : MongoDB Atlas (Cloud)**

1. Créer un compte sur [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Créer un cluster gratuit
3. Configurer l'accès réseau (0.0.0.0/0 pour développement)
4. Copier la chaîne de connexion dans `MONGODB_URI`

### Configuration Email

**Gmail SMTP :**

1. Activer l'authentification à 2 facteurs
2. Générer un mot de passe d'application
3. Utiliser ce mot de passe dans `EMAIL_PASS`

## 📱 Utilisation

### Flux Utilisateur Étudiant

1. **Inscription**

   ```
   GET /register → Formulaire d'inscription
   POST /api/auth/register → Création du compte
   GET /verify-email → Validation de l'email
   ```

2. **Profil**

   ```
   GET /student/profile → Compléter le profil
   POST /api/students/upload-cv → Upload du CV
   PUT /api/students/profile → Sauvegarde
   ```

3. **Recherche de stages**

   ```
   GET /search → Page de recherche
   GET /api/internships?field=IT → Filtrage
   GET /internship/:id → Détails d'une offre
   ```

4. **Candidature**
   ```
   POST /api/applications → Postuler
   GET /student/applications → Suivi
   ```

### Flux Utilisateur Entreprise

1. **Inscription et profil**

   ```
   POST /api/auth/register → Compte entreprise
   PUT /api/companies/profile → Profil complet
   ```

2. **Gestion des offres**

   ```
   POST /api/internships → Créer une offre
   GET /company/internships → Mes offres
   PUT /api/internships/:id → Modifier
   ```

3. **Candidatures**
   ```
   GET /api/companies/applications → Candidatures reçues
   PUT /api/applications/:id/status → Changer le statut
   ```

### API Endpoints Principaux

```bash
# Authentification
POST /api/auth/register     # Inscription
POST /api/auth/login        # Connexion
POST /api/auth/logout       # Déconnexion

# Profils
GET  /api/users/profile     # Profil utilisateur
PUT  /api/users/profile     # Modifier profil
POST /api/users/upload      # Upload fichier

# Stages
GET  /api/internships       # Liste des stages
POST /api/internships       # Créer un stage
GET  /api/internships/:id   # Détails d'un stage
PUT  /api/internships/:id   # Modifier un stage

# Candidatures
POST /api/applications      # Postuler
GET  /api/applications      # Mes candidatures
PUT  /api/applications/:id  # Modifier statut
```

## 🎨 Captures d'écran

> 📸 _Screenshots à ajouter après développement de l'UI_

- Landing page responsive
- Dashboard étudiant
- Dashboard entreprise
- Page de recherche
- Formulaire de candidature
- Interface mobile

## 🔧 Développement

### Scripts disponibles

**Backend :**

```bash
npm start          # Production
npm run dev        # Développement avec nodemon
npm run test       # Tests unitaires
npm run lint       # ESLint
npm run format     # Prettier
```

**Frontend :**

```bash
npm run dev        # Serveur de développement
npm run build      # Build de production
npm run preview    # Prévisualisation du build
npm run lint       # ESLint
npm run format     # Prettier
```

### Guidelines de Développement

**Code Style :**

- ESLint + Prettier configurés
- Commits conventionnels (feat:, fix:, docs:)
- Branches par feature : `feature/nom-feature`

**Architecture :**

- Composants React fonctionnels + hooks
- Context API pour l'état global
- Services API séparés des composants
- Middleware Express pour la logique commune

**Best Practices :**

- Validation côté client ET serveur
- Gestion d'erreur robuste
- Loading states et feedback utilisateur
- Mobile-first responsive design

## 🧪 Tests

### Tests Backend

```bash
cd server
npm test                    # Tous les tests
npm run test:watch         # Mode watch
npm run test:coverage      # Couverture de code
```

**Framework :** Jest + Supertest

- Tests unitaires des contrôleurs
- Tests d'intégration des routes
- Tests des modèles Mongoose

### Tests Frontend

```bash
cd client
npm test                   # Tests unitaires
npm run test:e2e          # Tests end-to-end
```

**Framework :** Vitest + Testing Library

- Tests de composants
- Tests d'intégration
- Tests e2e avec Playwright (optionnel)

## 📦 Déploiement

### Production sur Railway (Backend)

1. **Préparer le projet :**

   ```bash
   # Dans server/
   npm run build  # Si build nécessaire
   ```

2. **Déployer :**

   ```bash
   # Connecter à Railway
   npm install -g @railway/cli
   railway login
   railway init
   railway up
   ```

3. **Variables d'environnement :**
   ```bash
   railway variables set NODE_ENV=production
   railway variables set MONGODB_URI=mongodb+srv://...
   # ... autres variables
   ```

### Production sur Vercel (Frontend)

1. **Configuration (`vercel.json`) :**

   ```json
   {
     "builds": [
       {
         "src": "package.json",
         "use": "@vercel/static-build"
       }
     ],
     "routes": [
       { "handle": "filesystem" },
       { "src": "/.*", "dest": "/index.html" }
     ]
   }
   ```

2. **Déploiement :**
   ```bash
   # Dans client/
   npm install -g vercel
   vercel --prod
   ```

### Alternative Docker

```dockerfile
# Dockerfile.backend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: "3.8"
services:
  mongodb:
    image: mongo:5.0
    environment:
      MONGO_INITDB_DATABASE: stageconnect
    ports:
      - "27017:27017"

  backend:
    build: ./server
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongodb:27017/stageconnect

  frontend:
    build: ./client
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

## 🤝 Contribution

### Comment contribuer

1. **Fork** le projet
2. **Créer** une branche feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** les changements (`git commit -m 'Add some AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrir** une Pull Request

### Guidelines

- Respecter le code style existant
- Ajouter des tests pour les nouvelles fonctionnalités
- Mettre à jour la documentation si nécessaire
- Suivre les conventions de commit

### Issues et Bugs

Utiliser les templates GitHub :

- 🐛 **Bug Report** - Signaler un problème
- 💡 **Feature Request** - Proposer une amélioration
- 📚 **Documentation** - Améliorer la doc

## 📄 Licence

Ce projet est sous licence **MIT** - voir le fichier [LICENSE.md](LICENSE.md) pour les détails.

## 👥 Équipe

- **[Votre Nom]** - _Développeur Principal_ - [@votre-username](https://github.com/votre-username)

## 🙏 Remerciements

- [React](https://reactjs.org/) pour l'interface utilisateur
- [Express.js](https://expressjs.com/) pour le backend
- [MongoDB](https://www.mongodb.com/) pour la base de données
- [Tailwind CSS](https://tailwindcss.com/) pour le styling
- [Lucide](https://lucide.dev/) pour les icônes
- Communauté open source pour l'inspiration

## 📈 Roadmap

### Version 1.0 (MVP) ✅

- [x] Authentification
- [x] Profils utilisateurs
- [x] CRUD stages
- [x] Système de candidatures
- [x] Interface responsive

### Version 1.1 🚧

- [ ] Chat en temps réel
- [ ] Notifications push
- [ ] Analytics avancées
- [ ] API mobile
- [ ] Export de données

### Version 2.0 🔮

- [ ] Recommandations IA
- [ ] Intégrations université
- [ ] Système de notation
- [ ] Multi-langues
- [ ] Application mobile native

---

<div align="center">
  <strong>✨ Développé avec passion pour connecter les talents aux opportunités ✨</strong>
  <br><br>
  <a href="#-stageconnect---plateforme-de-stages">⬆️ Retour au sommaire</a>
</div>
