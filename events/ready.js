const mongoose = require("mongoose");
var plexWrapper = require("plex-wrapper");
const Helper = require("../modules/MongoHelper.js");
var env = require("dotenv").config();

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    const dbOptions = {
      useNewUrlParser: true,
      autoIndex: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4,
    };
    mongoose.connect(process.env.DB_URI, dbOptions);
    mongoose.set("useFindAndModify", false);
    mongoose.promise = global.promise;
    mongoose.connection.on("connected", () => {
      console.log("Mongoose connection initiated.");
    });
    mongoose.connection.on("err", (err) => {
      console.log(`Mongoose connection error: \n ${err.stack}`);
    });
    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose connection disconnected.");
    });
    var points = await Helper.GetPoints("663955324654321674");

    var plexClient = new plexWrapper.PlexAPIClient(
      process.env.PLEX_CLIENT,
      process.env.PLEX_USER,
      process.env.PLEX_PASS
    );
    client.PlexAPIClient = plexClient;
    client.user.setActivity(`Points: ${points}`, { type: "PLAYING" });
  },
};
