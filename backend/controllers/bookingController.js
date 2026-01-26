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