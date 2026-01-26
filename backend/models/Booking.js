const mongoose = require("mongoose");


const bookingSchema = new mongoose.Schema(
{
user: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true,
},
service: {
type: mongoose.Schema.Types.ObjectId,
ref: "Service",
required: true,
},
dateTime: {
type: Date,
required: true,
},
status: {
type: String,
enum: ["Pending", "Completed", "Cancelled"],
default: "Pending",
},
},
{ timestamps: true }
);


module.exports = mongoose.model("Booking", bookingSchema);