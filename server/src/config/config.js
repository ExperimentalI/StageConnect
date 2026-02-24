import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const config = {
  // Server
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  
  // Database
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/stageconnect",
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || "your-super-secret-key-change-in-production",
  JWT_EXPIRE: process.env.JWT_EXPIRE || "7d",
  
  // Email
  EMAIL_HOST: process.env.EMAIL_HOST || "smtp.gmail.com",
  EMAIL_PORT: process.env.EMAIL_PORT || 587,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_FROM: process.env.EMAIL_FROM || `"StageConnect" <${process.env.EMAIL_USER}>`,
  
  // Frontend
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "http://localhost:3000,http://localhost:5173",
  
  // File Upload
  UPLOAD_DIR: process.env.UPLOAD_DIR || path.join(process.cwd(), "server", "uploads"),
  MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || "5MB",
  
  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS || 100,
  
  // Cloudinary (for production)
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
  
  // Redis (for caching, optional)
  REDIS_URL: process.env.REDIS_URL,
  
  // Security
  BCRYPT_ROUNDS: parseInt(process.env.BCRYPT_ROUNDS) || 12,
  SESSION_SECRET: process.env.SESSION_SECRET || "your-session-secret",
};

export const isDevelopment = config.NODE_ENV === "development";
export const isProduction = config.NODE_ENV === "production";
export const isTest = config.NODE_ENV === "test";

export const validateConfig = () => {
  const requiredVars = [];
  
  if (isProduction) {
    requiredVars.push("JWT_SECRET", "MONGODB_URI", "EMAIL_USER", "EMAIL_PASS");
  }
  
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
  
  if (config.JWT_SECRET === "your-super-secret-key-change-in-production" && isProduction) {
    throw new Error("JWT_SECRET must be changed in production");
  }
};
