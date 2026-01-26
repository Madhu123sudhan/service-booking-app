const Booking = require("../models/Booking");


// CREATE BOOKING
exports.createBooking = async (req, res) => {
try {
const { serviceId, dateTime } = req.body;


if (!serviceId || !dateTime) {
return res.status(400).json({ message: "All fields required" });
}


const booking = await Booking.create({
user: req.user.id,
service: serviceId,
dateTime,
});


res.status(201).json(booking);
} catch (error) {
res.status(500).json({ message: "Server error" });
}
};


// GET MY BOOKINGS
exports.getMyBookings = async (req, res) => {
try {
const bookings = await Booking.find({ user: req.user.id })
.populate("service", "name price")
.sort({ createdAt: -1 });


res.json(bookings);
} catch (error) {
res.status(500).json({ message: "Server error" });
}
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Prevent cancelling others' bookings
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};