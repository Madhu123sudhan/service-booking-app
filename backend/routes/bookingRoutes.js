const express = require("express");
const router = express.Router();


const auth = require("../middleware/authMiddleware");
const {
createBooking,
getMyBookings,
cancelBooking
} = require("../controllers/bookingController");


router.post("/", auth, createBooking);
router.put("/cancel/:id", auth,cancelBooking);
router.get("/", auth, getMyBookings);

module.exports = router;