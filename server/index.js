import express from "express";
import { config, validateConfig } from "./src/config/config.js";
import { connectDB } from "./src/utils/database.js";
import { logger, logRequest, logError } from "./src/utils/logger.js";
import {
  securityHeaders,
  corsOptions,
  generalLimiter,
} from "./src/middleware/security.middleware.js";

// Routes
import routes from "./src/routes/index.js";

// Validate configuration
validateConfig();

// Initialize Express app
const app = express();

// Trust proxy for rate limiting and IP detection
app.set("trust proxy", 1);

// Security middleware
app.use(securityHeaders);
app.use(corsOptions);
app.use(generalLimiter);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Request logging
app.use(logRequest);

// Static files for uploads
app.use("/uploads", express.static("uploads"));

// API routes
app.use("/api", routes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    environment: config.NODE_ENV,
    uptime: process.uptime(),
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Error handling middleware
app.use(logError);

// Graceful shutdown
const gracefulShutdown = (signal) => {
  logger.info(`Received ${signal}, shutting down gracefully...`);

  server.close(() => {
    logger.info("HTTP server closed");
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    logger.error(
      "Could not close connections in time, forcefully shutting down",
    );
    process.exit(1);
  }, 10000);
};

// Start server
const server = app.listen(config.PORT, async () => {
  try {
    await connectDB();
    logger.info(`🚀 Server running on port ${config.PORT}`);
    logger.info(`📝 Environment: ${config.NODE_ENV}`);
    logger.info(`🌐 Frontend URL: ${config.FRONTEND_URL}`);
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
});

// Handle graceful shutdown
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

export default app;
