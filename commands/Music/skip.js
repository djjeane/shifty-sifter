const { SlashCommandBuilder } = require("@discordjs/builders");
const MusicManager = require("../../modules/MusicManager");
const { Song, MusicQueue } = require("../../modules/MusicQueue");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips the current song!"),
  async execute(interaction) {
    MusicQueue.NextSong();
    MusicManager.PlayNextSong();
    interaction.editReply(`Skipped Song!`);
  },
  settings: {
    cost: 100,
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
