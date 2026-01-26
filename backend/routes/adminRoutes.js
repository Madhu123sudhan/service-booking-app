const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// GET all bookings (ADMIN ONLY)
router.get("/bookings", auth, admin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("service")
      .populate("user", "name email");

    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// MARK booking as completed (ADMIN ONLY)
router.put("/bookings/:id", auth, admin, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "Completed";
    await booking.save();

    res.json({ message: "Booking marked as completed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
