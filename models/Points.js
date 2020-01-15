const mongoose = require('mongoose');

const PointsSchema = mongoose.Schema({
    id: String,
    points: Number,
});

module.exports = mongoose.model("Points", PointsSchema);