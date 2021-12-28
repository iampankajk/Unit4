const { Schema, model } = require("mongoose");

const carSchema = new Schema({
    City: { type: String, required: true },
    location: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    fuel: { type: String, required: true },
    Seater: { type: String, required: true },
    Rating: { type: String, required: true },
    img: { type: String, required: true }
}, {
    versionKey: false,
    timestamp: true,
});

module.exports = model("car", carSchema);