const mongoose = require('mongoose');

const Points = mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    points: {
        type: Number,
        min: 0
    }
});

module.exports = mongoose.model("Points", Points);