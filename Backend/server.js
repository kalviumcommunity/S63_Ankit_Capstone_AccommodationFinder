const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

// Custom Middleware for Logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes Import
const roomRoutes = require("./routes/roomRoutes");
app.use("/api", roomRoutes); // All routes will be under /api

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection failed:", err));

// Root Route
app.get("/", (req, res) => {
  res.send("🚀 Server is running and connected to MongoDB");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🌐 Server running on http://localhost:${PORT}`);
});