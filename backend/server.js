import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import homeRoutes from "./routes/homeRoutes.js";
import connectDB from "./config/db.js";

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "127.0.0.1";
const DB_URI = process.env.DB_URI;

// Connect DB
connectDB(DB_URI);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan(process.env.NODE_ENV === "production" ? "tiny" : "dev"));

// Routes
app.use("/api", homeRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found", success: false });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const message = err.message || "Internal Server error";
  const statusCode = err.status || 500;
  res.status(statusCode).json({ message, success: false });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`App running on http://${HOST}:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed gracefully");
    process.exit(0);
  });
});
