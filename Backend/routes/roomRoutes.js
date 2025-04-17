const express = require("express");
const router = express.Router();
const { createRoom, getAllRooms } = require("../controllers/roomController");

// router.post("/rooms", (req, res) => {
//     console.log("Request Body:", req.body);
//     createRoom(req, res);
//   });
router.post("/rooms", createRoom);


router.get("/", getAllRooms);

module.exports = router;