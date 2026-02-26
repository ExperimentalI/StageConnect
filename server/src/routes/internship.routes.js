import express from "express";
import InternShipController from "../controllers/InternShip.controller.js";
import {
  authenticateToken,
  authorizeRole,
  optionalAuth,
} from "../middleware/auth.middleware.js";
import {
  validateInternship,
  validateMongoId,
  validatePagination,
} from "../middleware/validation.middleware.js";
import { searchLimiter } from "../middleware/security.middleware.js";

const router = express.Router();

router.get(
  "/",
  optionalAuth,
  validatePagination,
  InternShipController.getInternships,
);
router.get("/featured", InternShipController.getFeaturedInternships);
router.get(
  "/search",
  searchLimiter,
  validatePagination,
  InternShipController.searchInternships,
);
router.get(
  "/:id",
  optionalAuth,
  validateMongoId("id"),
  InternShipController.getInternshipById,
);

router.post(
  "/",
  authenticateToken,
  authorizeRole(["company"]),
  validateInternship,
  InternShipController.createInternship,
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRole(["company"]),
  validateMongoId("id"),
  validateInternship,
  InternShipController.updateInternship,
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole(["company"]),
  validateMongoId("id"),
  InternShipController.deleteInternship,
);

router.patch(
  "/:id/status",
  authenticateToken,
  authorizeRole(["company"]),
  validateMongoId("id"),
  InternShipController.updateInternshipStatus,
);

export default router;
