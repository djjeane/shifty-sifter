const mongoose = require('mongoose');

const PointRecordSchema = mongoose.Schema({
    id: String,
    points: Number,
});

module.exports = mongoose.model("PointRec", PointRecordSchema);