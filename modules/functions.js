const mongoose = require('mongoose');
const Points = require('../models/Points.js');
const WheelCooldowns = require('../models/WheelCooldown.js')
module.exports =  (client) => {
    client.GetPoints = async (userID2) => {

      let pointsVal = 0;
        await Points.findOne({userID: userID2}).then(function(doc)
        {
          if(doc == null){
            client.CreatePointRecord(userID2);
            return 0;
          }
          pointsVal = doc.points;
          console.log(pointsVal);
          
        });
      return pointsVal;
      }
    client.GetAllPoints = async () => {
      var pointsList = [];
      
      await Points.find({}).then(function (docs) {
        if (docs == null) {
          console.log('doc was null')
        }
        docs.forEach(doc => {
          console.log(doc.points);
          pointsList.push({'points': doc.points, 'userID':doc.userID});
        });

      });
      return pointsList;
    }
    
    client.UpdatePoints = async (userID2, pointsAdded) =>
    {
        let pointsVal = -1;
        await Points.findOne({
          userID: userID2
        }).then(function (doc)
        {
          if(!doc)
          {
            client.CreatePointRecordAndUpdate(userID2, pointsAdded)
            return;
          }
          var newTotal = doc.points + pointsAdded;
          if(newTotal < 0) newTotal = 0;
          doc.points = newTotal;
          // console.log(doc.points)
          // console.log(pointsRecord)
          doc.save(function (err)
          {
            if (err) throw err;;
          });
          

          console.log('Point record successfully updated!');
        });}


    client.CreatePointRecord = async(userID2) =>
    {
      var newPoints = Points({
        userID: userID2,
        points: 0
      });

      newPoints.save(function (err) {
        if (err) throw err;

        console.log('Point Record created!');
      });
    }

    client.CreatePointRecordAndUpdate = async (userID2,AmountToSet) => {
      var newPoints = Points({
        userID: userID2,
        points: Math.abs(AmountToSet)
      });

      newPoints.save(function (err) {
        if (err) throw err;

        console.log('Point Record created and updated!');
      });
    }
    client.GetWheelCooldown = async(userID2) => {
      let canSpinTime = Date.now();
        await WheelCooldowns.findOne({userID: userID2}).then(function(doc)
        {
          if(doc == null){
            client.CreateCooldownRecord(userID2);
            return canSpinTime;
          }
          canSpinTime = doc.canSpinTime;
          console.log(canSpinTime);
          
        });
      return canSpinTime;
    }
    client.CreateCooldownRecord = async(userID2) =>
    {
      var newcooldown = WheelCooldowns({
        userID: userID2,
        canSpinTime: Date.now() + 3600000
      });

      newcooldown.save(function (err) {
        if (err) throw err;

        console.log('New Cooldown Added created!');
      });
    }
    client.UpdateCooldown = async (userID2) =>
    {
        await WheelCooldowns.findOne({
          userID: userID2
        }).then(function (doc)
        {
          if(!doc)
          {
            client.CreateCooldownRecord(userID2)
            return;
          }
          var newCooldown = Date.now() + 3600000;
  
          doc.canSpinTime = newCooldown;
          // console.log(doc.points)
          // console.log(pointsRecord)
          doc.save(function (err)
          {
            if (err) throw err;;
          });
          

          console.log('Cooldown record successfully updated!');
        });}

    client.getOrd(i)
    {
      var j = i % 10,
        k = i % 100;
      if (j == 1 && k != 11) {
        return i + "st";
      }
      if (j == 2 && k != 12) {
        return i + "nd";
      }
      if (j == 3 && k != 13) {
        return i + "rd";
      }
      return i + "th";
    }
  /*
  PERMISSION LEVEL FUNCTION

  This is a very basic permission system for commands which uses "levels"
  "spaces" are intentionally left black so you can add them if you want.
  NEVER GIVE ANYONE BUT OWNER THE LEVEL 10! By default this can run any
  command including the VERY DANGEROUS `eval` and `exec` commands!

  */
  client.permlevel = message => {
    let permlvl = 0;

    const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

    while (permOrder.length) {
      const currentLevel = permOrder.shift();
      if (message.guild && currentLevel.guildOnly) continue;
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level;
        break;
      }
    }
    return permlvl;
  };

  /*
  GUILD SETTINGS FUNCTION

  This function merges the default settings (from config.defaultSettings) with any
  guild override you might have for particular guild. If no overrides are present,
  the default settings are used.

  */
  
  // THIS IS HERE BECAUSE SOME PEOPLE DELETE ALL THE GUILD SETTINGS
  // And then they're stuck because the default settings are also gone.
  // So if you do that, you're resetting your defaults. Congrats.
  const defaultSettings = {
    "prefix": "~",
    "modLogChannel": "lavatory",
    "modRole": "Ceramic",
    "adminRole": "Golden Throne",
    "systemNotice": "true",
    "welcomeChannel": "Knock-twice",
    "welcomeMessage": "Please respect the glory hole zone.",
    "welcomeEnabled": "false"
  };

  // getSettings merges the client defaults with the guild settings. guild settings in
  // enmap should only have *unique* overrides that are different from defaults.
  client.getSettings = (guild) => {
    client.settings.ensure("default", defaultSettings);
    if(!guild) return client.settings.get("default");
    const guildConf = client.settings.get(guild.id) || {};
    // This "..." thing is the "Spread Operator". It's awesome!
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    return ({...client.settings.get("default"), ...guildConf});
  };

  client.msToTime = (duration) => {
      var milliseconds = parseInt((duration % 1000) / 100),
        seconds = parseInt((duration / 1000) % 60),
        minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;

      return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }

  /*
  SINGLE-LINE AWAITMESSAGE

  A simple way to grab a single reply, from the user that initiated
  the command. Useful to get "precisions" on certain things...

  USAGE

  const response = await client.awaitReply(msg, "Favourite Color?");
  msg.reply(`Oh, I really love ${response} too!`);

  */
  client.awaitReply = async (msg, question, limit = 60000) => {
    const filter = m => m.author.id === msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  };

  client.awaitReply = async (msg, question,userWhoCanReplyID, limit = 60000) => {
    const filter = m => m.author.id === userWhoCanReplyID;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, {
        max: 1,
        time: limit,
        errors: ["time"]
      });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  };

  client.awaitFullReply = async (msg, question, limit = 60000) => {
    const filter = m => m.author.id === msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, {
        max: 1,
        time: limit,
        errors: ["time"]
      });
      return collected;
    } catch (e) {
      console.log(e)
      return null;
    }
  };


  /*
  MESSAGE CLEAN FUNCTION

  "Clean" removes @everyone pings, as well as tokens, and makes code blocks
  escaped so they're shown more easily. As a bonus it resolves promises
  and stringifies objects!
  This is mostly only used by the Eval and Exec commands.
  */
  client.clean = async (client, text) => {
    if (text && text.constructor.name == "Promise")
      text = await text;
    if (typeof text !== "string")
      text = require("util").inspect(text, {depth: 1});

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(client.token, "NjYzOTU1MzI0NjU0MzIxNjc0.XhZ_Tw.evTm2nD7ZZAe9_TasDzMl7vI0pM");

    return text;
  };

  client.loadCommand = (commandName) => {
    try {
      client.logger.log(`Loading Command: ${commandName}`);
      const props = require(`../commands/${commandName}`);
      if (props.init) {
        props.init(client);
      }
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  };

  client.unloadCommand = async (commandName) => {
    let command;
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName);
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName));
    }
    if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;
    
    if (command.shutdown) {
      await command.shutdown(client);
    }
    const mod = require.cache[require.resolve(`../commands/${command.help.name}`)];
    delete require.cache[require.resolve(`../commands/${command.help.name}.js`)];
    for (let i = 0; i < mod.parent.children.length; i++) {
      if (mod.parent.children[i] === mod) {
        mod.parent.children.splice(i, 1);
        break;
      }
    }
    return false;
  };

  /* MISCELANEOUS NON-CRITICAL FUNCTIONS */
  
  // EXTENDING NATIVE TYPES IS BAD PRACTICE. Why? Because if JavaScript adds this
  // later, this conflicts with native code. Also, if some other lib you use does
  // this, a conflict also occurs. KNOWING THIS however, the following 2 methods
  // are, we feel, very useful in code. 
  
  // <String>.toPropercase() returns a proper-cased string such as: 
  // "Mary had a little lamb".toProperCase() returns "Mary Had A Little Lamb"
  Object.defineProperty(String.prototype, "toProperCase", {
    value: function() {
      return this.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }
  });

  // <Array>.random() returns a single random element from an array
  // [1, 2, 3, 4, 5].random() can return 1, 2, 3, 4 or 5.
  Object.defineProperty(Array.prototype, "random", {
    value: function() {
      return this[Math.floor(Math.random() * this.length)];
    }
  });

  // `await client.wait(1000);` to "pause" for 1 second.
  client.wait = require("util").promisify(setTimeout);

  // These 2 process methods will catch exceptions and give *more details* about the error and stack trace.
  process.on("uncaughtException", (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    client.logger.error(`Uncaught Exception: ${errorMsg}`);
    console.error(err);
    // Always best practice to let the code crash on uncaught exceptions. 
    // Because you should be catching them anyway.
    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    client.logger.error(`Unhandled rejection: ${err}`);
    console.error(err);
  });
};
