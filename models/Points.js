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
},
{
    Collection: 'Points'
}
);

module.exports = mongoose.model("Points", Points);