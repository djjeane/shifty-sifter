// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.
var helper = require('../modules/sorthelper.js');
module.exports = async (client, message) => {
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if (message.author.bot) return;

  // Grab the settings for this server from Enmap.
  // If there is no guild, get default conf (DMs)
  const settings = message.settings = client.getSettings(message.guild);

  // Checks if the bot was mentioned, with no message after it, returns the prefix.
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    //return message.reply(`My prefix is \`${settings.prefix}\`. Please gamble responsibly. Also Flush. Please Flush.`);
    return;
  }
  // Bans tiktok links
  const bannedWords = [ 
    "bitly", 
    "goo.gl",
    "tinyurl",
    "ow.ly",
    "is.gd",
    "buff.ly",
    "adf.ly",
    "bit.do",
    "Mcaf.ee",
    "rebrandly",
    "su.pr",
    "polar",
    "tiktok",
    "nigger",
    "nigga",
    "niggog",
    "nigg3r",
    "n1gger",
    "n1gg3r",
    "Dawson"
  ]
  
  var start = Date.now()
  bannedWords.forEach(word => {

      if (message.content.toLowerCase().includes(word))
      {
        console.log(bannedWords.indexOf(message.content.toLowerCase()))
        message.delete()
          .then(message.channel.send('Link Deleted:\n**TikTok is porn for Tweens** or you said the nword you racist fuck.'))
        var end = Date.now()
        message.channel.send(end - start + " milliseconds")
        return;
      }

    })
  
  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if (message.content.indexOf(settings.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // If the member on a guild is invisible or not cached, fetch them.
  if (message.guild && !message.member)  message.guild.fetchMember(message.author);

  // Get the user or member's permission level from the elevation
  console.log(`Message Received: ${message}`)
  const level = client.permlevel(message);
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

  if(cmd != null)
  {
    var pointsReq = cmd.conf.pointRec;

    if (pointsReq != 0)
    {
        var userPoints = await client.GetPoints(message.author.id);
        if(userPoints - pointsReq < 0)
        {
          message.reply(`This command costs ${pointsReq} points and you only have ${userPoints}.Make sure to SPIN THE WHEEL!!!!`)
          return;
        }
        console.log(client.user.id)
        var points = await client.GetPoints(client.user.id);

        await client.UpdatePoints(message.author.id,-1 * pointsReq);
        await client.UpdatePoints(client.user.id, pointsReq);
        message.reply(`You have paid ${pointsReq} points in order to use the ${cmd.help.name} command. Sifty now has ${points + pointsReq} points!`);
    }
}
  // Check whether the command, or alias, exist in the collections defined
  // in app.js.
  // using this const varName = thing OR otherthign; is a pretty efficient
  // and clean way to grab one of 2 values!
  if (!cmd) return;

  // Some commands may not be useable in DMs. This check prevents those commands from running
  // and return a friendly error message.
  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send("This command is unavailable via private message. Please run this command in a Mercy Flush.");

  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return message.channel.send(`You do not have permission to use this command.
  Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name})
  This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
    } else {
      return;
    }
  }

  // To simplify message arguments, the author's level is now put on level (not member so it is supported in DMs)
  // The "level" command module argument will be deprecated in the future.
  message.author.permLevel = level;
  
  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }
  // If the command exists, **AND** the user has permission, run it.
  console.log(`Commands: ${client.commands}`);
  client.logger.cmd(`[CMD] ${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);

  cmd.run(client, message, args, level);

};
