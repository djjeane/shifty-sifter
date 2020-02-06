const mongoose = require('mongoose');
//const MongoClient = require('mongodb').MongoClient;

module.exports = async client => {
  // Log that the bot is online.
  client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "ready");

  // Make the bot "play the game" which is the help command with default prefix.
  client.user.setActivity(`Points: ${ await client.GetPoints(message.author.id)}`, {type: "PLAYING"});
  await mongoose.connect('mongodb+srv://djjeane:CleanCode123@siftydb-6b84b.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useFindAndModify: false
  });
};
