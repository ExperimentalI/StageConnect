import express from "express";
import authRoutes from "./auth.routes.js";
import studentRoutes from "./student.routes.js";
import companyRoutes from "./company.routes.js";
import internshipRoutes from "./internship.routes.js";
import applicationRoutes from "./application.routes.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const router = express.Router();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: " Hello StageConnect API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJSDoc(options);

router.use("/auth", authRoutes);
router.use("/students", studentRoutes);
router.use("/companies", companyRoutes);
router.use("/internships", internshipRoutes);
router.use("/applications", applicationRoutes);
router.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

export default router;
