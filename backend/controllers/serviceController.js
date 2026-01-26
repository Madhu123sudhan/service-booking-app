const Service = require("../models/Service");


// GET ALL SERVICES
exports.getServices = async (req, res) => {
try {
const services = await Service.find();
res.json(services);
} catch (error) {
res.status(500).json({ message: "Server error" });
}
};


// SEED SERVICES (Run once)
exports.seedServices = async (req, res) => {
try {
await Service.deleteMany();


const services = await Service.insertMany([
{ name: "Hair Cut", price: 200 },
{ name: "Facial", price: 800 },
{ name: "Pedicure", price: 600 },
{ name: "Spa", price: 1200 },
]);


res.json(services);
} catch (error) {
res.status(500).json({ message: "Server error" });
}
};