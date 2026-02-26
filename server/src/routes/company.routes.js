import express from "express";
import CompanyController from "../controllers/Company.controller.js";
import { authenticateToken, authorizeRole } from "../middleware/auth.middleware.js";
import { validateCompanyProfile, validateMongoId, validatePagination } from "../middleware/validation.middleware.js";
import { uploadLogo, handleUploadError } from "../middleware/upload.middleware.js";

const router = express.Router();

router.use(authenticateToken);
router.use(authorizeRole(["company"]));

router.post("/profile", validateCompanyProfile, CompanyController.createProfile);
router.get("/profile", CompanyController.getProfile);
router.put("/profile", validateCompanyProfile, CompanyController.updateProfile);
router.delete("/profile", CompanyController.deleteProfile);

router.post("/upload-logo", uploadLogo, handleUploadError, CompanyController.uploadLogo);

router.get("/internships", validatePagination, CompanyController.getCompanyInternships);
router.get("/applications", validatePagination, CompanyController.getCompanyApplications);

router.get("/search", validatePagination, CompanyController.searchCompanies);
router.get("/:id", validateMongoId("id"), CompanyController.getProfileById);

export default router;
