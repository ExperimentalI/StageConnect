import express from "express";
import UserConnect from "../controllers/User.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { validateUserRegistration, validateUserLogin } from "../middleware/validation.middleware.js";
import { authLimiter } from "../middleware/security.middleware.js";

const router = express.Router();

router.post("/register", authLimiter, validateUserRegistration, UserConnect.signup);
router.post("/login", authLimiter, validateUserLogin, UserConnect.login);
router.post("/logout", authenticateToken, UserConnect.logout);

router.get("/me", authenticateToken, UserConnect.getUser);
router.put("/me", authenticateToken, UserConnect.updateUser);
router.post("/change-password", authenticateToken, UserConnect.changePassword);
router.delete("/account", authenticateToken, UserConnect.deleteAccount);

export default router;
