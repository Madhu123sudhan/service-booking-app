const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const jwt = require("jsonwebtoken");


//ADMIN LOGIN
router.post("/adminlogin", (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
    }

    const adminemail = process.env.ADMIN_EMAIL;
    const adminpassword = process.env.ADMIN_PASSWORD;
    if (email !== adminemail || password !== adminpassword) {
        return res.status(400).json({ message: "Invalid admin credentials" });
    }
    const token = jwt.sign(
          {
            id: process.env.ADMIN_EMAIL,
            role: "admin", // 🔥 Force role into token
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

    res.json({
        token,
        role: "admin",
        admin_name: "admin",
        message: "Admin login successful",
    });
});

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
