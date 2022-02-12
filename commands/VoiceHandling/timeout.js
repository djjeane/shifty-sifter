const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    if (args.length == 0 || args.length == 1) return;
    if (args[1] == "null" || args[1] == "undefined" || args[1] == "NaN") {
      var timeInSeconds = 60;
    } else {
      var timeInMins = args[1];
      if (timeInMins > 5) {
        timeInMins = 5;
      }
      var timeInSeconds = timeInMins * 60;
    }

    var taggedUser = message.mentions.members.first();
    taggedUser.setMute(true);
    setTimeout(() => {
      taggedUser.setMute(false);
    }, timeInSeconds * 1000);
  },
};
