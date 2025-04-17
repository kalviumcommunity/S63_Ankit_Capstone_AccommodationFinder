const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomType: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);