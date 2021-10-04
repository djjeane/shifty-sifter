const mongoose = require('mongoose');
const { Collection } = require('mongoose');

const Point = mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true
    },
    points: {
        type: Number,
        min: 0
    }
},
{
    Collection: 'points'
}
);

module.exports = mongoose.model("Points", Point,'points');