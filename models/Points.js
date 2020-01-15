const mongoose = require('mongoose');

const Points = mongoose.Schema({
    id: String,
    points: Number,
});

module.exports = mongoose.model("Points", Points);