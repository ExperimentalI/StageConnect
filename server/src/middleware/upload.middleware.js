import multer from "multer";
import path from "path";
import fs from "fs";

const ensureUploadDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadDir;
    
    if (file.fieldname === "cv") {
      uploadDir = path.join(process.cwd(), "server", "uploads", "cv");
    } else if (file.fieldname === "logo") {
      uploadDir = path.join(process.cwd(), "server", "uploads", "logo");
    } else if (file.fieldname === "profilePicture") {
      uploadDir = path.join(process.cwd(), "server", "uploads", "profile");
    } else {
      uploadDir = path.join(process.cwd(), "server", "uploads", "documents");
    }
    
    ensureUploadDir(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = {
    "cv": [".pdf", ".doc", ".docx"],
    "logo": [".jpg", ".jpeg", ".png", ".gif", ".webp"],
    "profilePicture": [".jpg", ".jpeg", ".png", ".gif", ".webp"],
    "default": [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png", ".gif", ".webp"]
  };

  const fieldAllowedTypes = allowedTypes[file.fieldname] || allowedTypes.default;
  const fileExt = path.extname(file.originalname).toLowerCase();

  if (fieldAllowedTypes.includes(fileExt)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Allowed types: ${fieldAllowedTypes.join(", ")}`), false);
  }
};

export const uploadCV = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1
  }
}).single("cv");

export const uploadLogo = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
    files: 1
  }
}).single("logo");

export const uploadProfilePicture = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
    files: 1
  }
}).single("profilePicture");

export const uploadDocument = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 5 // Max 5 files
  }
}).array("documents", 5);

export const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ error: "File too large" });
    }
    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({ error: "Too many files" });
    }
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({ error: "Unexpected file field" });
    }
  }
  
  if (error.message.includes("Invalid file type")) {
    return res.status(400).json({ error: error.message });
  }
  
  next(error);
};
