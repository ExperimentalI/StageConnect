import express from "express";
import authRoutes from "./auth.routes.js";
import studentRoutes from "./student.routes.js";
import companyRoutes from "./company.routes.js";
import internshipRoutes from "./internship.routes.js";
import applicationRoutes from "./application.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/students", studentRoutes);
router.use("/companies", companyRoutes);
router.use("/internships", internshipRoutes);
router.use("/applications", applicationRoutes);

router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

export default router;
