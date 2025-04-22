const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error("POST /users error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error("GET /users error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;