const { Collection } = require("mongoose");
const mongoose = require("mongoose");

const Event = mongoose.Schema(
  {
    EventName: {
      type: String,
      required: true,
      unique: true,
    },
    EventStartTime: {
      type: Date,
    },
    EventNotifyTime: {
      type: Date,
    },
    UsersToNotify: [
      {
        type: String,
      },
    ],
    EventClosed: {
      type: Boolean,
      default: false,
    },
    EventOrganizer: {
      type: String,
    },
  },
  { collection: "events" }
);

module.exports = mongoose.model("Events", Event, "events");
