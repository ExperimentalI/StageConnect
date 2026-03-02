// Base types
export type UserRole = 'student' | 'company';
export type WorkType = 'Présentiel' | 'Télétravail' | 'Hybride';

// User related types
export interface User {
  _id: string;
  email: string;
  role: UserRole;
  profile?: string | StudentProfile | CompanyProfile;
  isVerified: boolean;
  isActive: boolean;
  lasLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Address type
export interface Address {
  street?: string;
  city: string;
  zipCode?: string;
  country: string;
}

// Student Profile types
export type Degree = 'Licence' | 'Master' | 'Ingeneer' | 'BTS' | 'Other';
export type LanguageLevel = 'Débutant' | 'Intermediaire' | 'Avancé' | 'Natif';

export interface Education {
  institution?: string;
  degree?: Degree;
  field?: string;
  currentYear?: number;
  expectedGraduation?: Date;
  gpa?: number;
}

export interface Language {
  language: string;
  level: LanguageLevel;
}

export interface CV {
  filename?: string;
  url?: string;
  uploadedAt?: Date;
}

export interface InternShipPreferences {
  field: string[];
  location: string[];
  startDate?: Date;
  duration: number; // 3-12 months
  workType: WorkType;
}

export interface StudentProfile {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth?: Date;
  profilePicture?: string;
  address?: Address;
  education?: Education;
  skills: string[];
  languages: Language[];
  cv?: CV;
  portfolio?: string;
  internShipPreferences?: InternShipPreferences;
  bio?: string;
  isProfileComplete: boolean;
  uploadedAt: Date;
}

// Company Profile types
export type Industry = 'IT/Tech' | 'Marketing' | 'Finance' | 'Santé' | 'Education' | 'Autre';
export type CompanySize = '1-10' | '11-50' | '51-200' | '201-500' | '500+';

export interface ContactPerson {
  firstName: string;
  lastName: string;
  position?: string;
  phone?: string;
  email?: string;
}

export interface SocialLinks {
  linkedin?: string;
  facebook?: string;
  twitter?: string;
}

export interface CompanyProfile {
  _id: string;
  userId: string;
  companyName: string;
  industry: Industry;
  companySize: CompanySize;
  foundedYear?: number;
  website?: string;
  logo?: string;
  description: string;
  mission?: string;
  headquarters: Address;
  contactPerson: ContactPerson;
  socialLinks?: SocialLinks;
  isVerified: boolean;
  isProfileComplete: boolean;
  updatedAt: Date;
}

// Internship types
export type InternshipField = 'Informatique' | 'Marketing' | 'Finance' | 'RH' | 'Design' | 'Autre';
export type InternshipStatus = 'draft' | 'active' | 'paused' | 'closed';
export type CompensationPeriod = 'Mensuel' | 'Total' | 'Aucune';
export type EducationLevel = 'Licence' | 'Master' | 'Ingénieur' | 'BTS' | 'Tout niveau';

export interface Compensation {
  amount?: number;
  currency: string;
  period: CompensationPeriod;
  benefits?: string[];
}

export interface Internship {
  _id: string;
  companyId: string;
  title: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  field: InternshipField;
  subField?: string;
  workType: WorkType;
  duration: number; // 1-12 months
  startDate: Date;
  endDate?: Date;
  location: {
    city: string;
    address?: string;
    country: string;
  };
  compensation?: Compensation;
  maxApplicants: number;
  currentApplicants: number;
  status: InternshipStatus;
  requiredSkills: string[];
  preferredSkills: string[];
  educationLevel?: EducationLevel;
  applicationDeadline?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Application types
export type ApplicationStatus = 'pending' | 'reviewing' | 'shortlisted' | 'interview' | 'accepted' | 'rejected' | 'withdrawn';
export type InterviewType = 'Présentiel' | 'Visioconférence' | 'Téléphone';

export interface Interview {
  scheduled: boolean;
  date?: Date;
  type?: InterviewType;
  location?: string;
  notes?: string;
}

export interface Application {
  _id: string;
  internshipId: string;
  studentId: string;
  coverLetter: string;
  customCV?: string;
  status: ApplicationStatus;
  companyNotes?: string;
  feedback?: string;
  appliedAt: Date;
  reviewedAt?: Date;
  statusUpdatedAt?: Date;
  interview?: Interview;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  role: UserRole;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Form types
export interface StudentProfileForm {
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth?: string;
  profilePicture?: string;
  address?: Address;
  education?: Education;
  skills: string[];
  languages: Language[];
  portfolio?: string;
  internShipPreferences?: InternShipPreferences;
  bio?: string;
}

export interface CompanyProfileForm {
  companyName: string;
  industry: Industry;
  companySize: CompanySize;
  foundedYear?: number;
  website?: string;
  logo?: string;
  description: string;
  mission?: string;
  headquarters: Address;
  contactPerson: ContactPerson;
  socialLinks?: SocialLinks;
}

export interface InternshipForm {
  title: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  field: InternshipField;
  subField?: string;
  workType: WorkType;
  duration: number;
  startDate: string;
  endDate?: string;
  location: {
    city: string;
    address?: string;
    country: string;
  };
  compensation?: Compensation;
  maxApplicants?: number;
  requiredSkills: string[];
  preferredSkills: string[];
  educationLevel?: EducationLevel;
  applicationDeadline?: string;
}

export interface ApplicationForm {
  coverLetter: string;
  customCV?: string;
}
