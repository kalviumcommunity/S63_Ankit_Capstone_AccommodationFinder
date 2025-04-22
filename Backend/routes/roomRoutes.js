const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

// ✅ POST - Create a new room
router.post("/rooms", async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    console.error("POST /rooms error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});



// ✅ GET - Fetch all rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    console.error("GET /rooms error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});



// ✅ PUT - Update a room by ID
router.put("/rooms/:id", async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(updatedRoom);
  } catch (error) {
    console.error("PUT /rooms/:id error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});



// ✅ DELETE - Delete a room by ID
router.delete("/rooms/:id", async (req, res) => {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("DELETE /rooms/:id error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

