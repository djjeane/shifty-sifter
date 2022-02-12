const mongoose = require("mongoose");
const { Collection } = require("mongoose");

const WheelCooldown = mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
      unique: true,
    },
    canSpinTime: {
      type: Date,
    },
  },
  {
    Collection: "wheelcooldowns",
  }
);

module.exports = mongoose.model(
  "WheelCooldown",
  WheelCooldown,
  "wheelcooldowns"
);
