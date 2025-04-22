const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
const User = require("../models/User");

// ✅ POST - Create a User (for testing purposes)
router.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET - All Users (optional, for testing)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().populate("roomsOwned");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST - Create a new Room and assign to User
router.post("/rooms", async (req, res) => {
  try {
    const { roomType, price, location, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newRoom = new Room({ roomType, price, location, owner: userId });
    const savedRoom = await newRoom.save();

    user.roomsOwned.push(savedRoom._id);
    await user.save();

    res.status(201).json(savedRoom);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET - All rooms with owner details
router.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find().populate("owner", "name email");
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ PUT - Update a Room
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ DELETE - Delete Room & remove from User
router.delete("/rooms/:id", async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    await User.findByIdAndUpdate(room.owner, {
      $pull: { roomsOwned: room._id }
    });

    res.status(200).json({ message: "Room deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;