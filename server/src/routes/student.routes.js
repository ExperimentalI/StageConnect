import express from "express";
import StudentProfileController from "../controllers/StudentProfile.controller.js";
import {
  authenticateToken,
  authorizeRole,
} from "../middleware/auth.middleware.js";
import {
  validateStudentProfile,
  validateMongoId,
  validatePagination,
} from "../middleware/validation.middleware.js";
import {
  uploadCV,
  uploadProfilePicture,
  handleUploadError,
} from "../middleware/upload.middleware.js";

const router = express.Router();

router.use(authenticateToken);
router.use(authorizeRole(["student"]));

router.post(
  "/profile",
  validateStudentProfile,
  StudentProfileController.createProfile,
);
router.get("/profile", StudentProfileController.getProfile);
router.put(
  "/profile",
  validateStudentProfile,
  StudentProfileController.updateProfile,
);
router.delete("/profile", StudentProfileController.deleteProfile);

router.post(
  "/upload-cv",
  uploadCV,
  handleUploadError,
  StudentProfileController.uploadCV,
);
router.post(
  "/upload-picture",
  uploadProfilePicture,
  handleUploadError,
  StudentProfileController.uploadProfilePicture,
);

router.get(
  "/applications",
  validatePagination,
  StudentProfileController.getStudentApplications,
);
router.get(
  "/applications/:id",
  validateMongoId("id"),
  StudentProfileController.getApplicationById,
);
router.delete(
  "/applications/:id",
  validateMongoId("id"),
  StudentProfileController.withdrawApplication,
);

router.get(
  "/search",
  validatePagination,
  StudentProfileController.searchProfiles,
);

// router.get("/:id", validateMongoId("id"), StudentProfileController.getProfileById);

export default router;
