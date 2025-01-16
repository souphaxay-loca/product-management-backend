const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
require("./models/category");
require("./models/unit");

const errorHandler = require("./middleware/errorHandler");
const logger = require("./middleware/logger");

const productRoute = require("./routes/productRoute");

// initialize the express app
const app = express();

// connect to the database
connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// API routes
app.use("/api/products", productRoute);

// welcome route
app.get("/", (req, res) => {
  res.json({
    message: "ສະບາຍດີ! ຍິນດີຕ້ອນຮັບສູ່ Product API",
    version: "1.0.0",
  });
});

// Handle 404 routes
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection:", err.message);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception:", err.message);
  server.close(() => process.exit(1));
});

module.exports = app;