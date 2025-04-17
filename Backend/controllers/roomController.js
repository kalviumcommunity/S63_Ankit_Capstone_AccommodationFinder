const Room = require("../models/Room");

const createRoom = async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
    // console.log("Error creating room:", error);
  }
};

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRoom,
  getAllRooms
};