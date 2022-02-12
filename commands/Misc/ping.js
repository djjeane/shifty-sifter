const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    await interaction.editReply("Pong!");
  },
  settings: {
    cost: 0,
  },
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  pointRec: 0,
};

exports.help = {
  name: "ping",
  category: "Miscellaneous",
  description: "It like... Pings. Then Pongs. And it's not Ping Pong.",
  usage: "ping",
};
