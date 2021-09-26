const mongoose = require('mongoose');
//const MongoClient = require('mongodb').MongoClient;
var env = require('dotenv').config();

  // Make the bot "play the game" which is the help command with default prefix.
  client.user.setActivity(
    `Points: ${await client.GetPoints('663955324654321674')}`,
    { type: "PLAYING" }
  );
  await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false
  });
};
