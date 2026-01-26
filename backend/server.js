const express = require("express");
const cors = require("cors");
require("dotenv").config();


const connectDB = require("./config/db");


const app = express();


// Connect DB
connectDB();


// Middleware
app.use(cors());
app.use(express.json());


// Test route
app.get("/", (req, res) => {
res.send("A buddy We succeeded Finally!");
});


// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));



const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});