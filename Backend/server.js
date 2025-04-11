const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection failed:", err));

// Basic Route
app.get("/", (req, res) => {
  res.send("🚀 Server is running and connected to MongoDB");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
});