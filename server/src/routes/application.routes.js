import express from "express";
import ApplicationController from "../controllers/Application.controller.js";
import {
  authenticateToken,
  authorizeRole,
} from "../middleware/auth.middleware.js";
import {
  validateApplication,
  validateApplicationStatus,
  validateMongoId,
  validatePagination,
} from "../middleware/validation.middleware.js";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  authorizeRole(["student"]),
  validateApplication,
  ApplicationController.createApplication,
);

router.get(
  "/student",
  authenticateToken,
  authorizeRole(["student"]),
  validatePagination,
  ApplicationController.getStudentApplications,
);
router.get(
  "/company",
  authenticateToken,
  authorizeRole(["company"]),
  validatePagination,
  ApplicationController.getCompanyApplications,
);

router.get(
  "/stats",
  authenticateToken,
  ApplicationController.getApplicationStats,
);

router.get(
  "/:id",
  authenticateToken,
  validateMongoId("id"),
  ApplicationController.getApplicationById,
);
router.put(
  "/:id/status",
  authenticateToken,
  authorizeRole(["company"]),
  validateMongoId("id"),
  validateApplicationStatus,
  ApplicationController.updateApplicationStatus,
);
router.post(
  "/:id/interview",
  authenticateToken,
  authorizeRole(["company"]),
  validateMongoId("id"),
  ApplicationController.scheduleInterview,
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole(["student"]),
  validateMongoId("id"),
  ApplicationController.withdrawApplication,
);

export default router;
