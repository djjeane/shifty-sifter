const mongoose = require('mongoose');

const WheelCooldown = mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    canSpinTime: {
        type: Date,
    }
});

module.exports = mongoose.model("WheelCooldown", WheelCooldown);