const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Helper = require("../../modules/MongoHelper.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Shows the leaderboard of the current point holders.")
    .addIntegerOption((option) =>
      option
        .setName("numusers")
        .setDescription("Enter a number of users to display.")
    ),
  async execute(interaction) {
    let numPlayers = interaction.options.getInteger("numusers");

    if (!numPlayers) {
      numPlayers = 5;
    }

    const embed = new MessageEmbed()
      .setTitle("Points Leaderboard")
      .setColor(0x00ae86);
    var pointsList = await Helper.GetAllPoints();
    pointsList.sort((a, b) => b.points - a.points);

    if (pointsList.length - numPlayers < 0) {
      numPlayers = pointsList.length;
    }

    for (var i = 0; i < numPlayers; i++) {
      var element = pointsList[i];
      var points = element.points;

      if (points == 0) break;
      var placestring = getOrd(i + 1);
      var user = await interaction.client.users.fetch(element.userID);
      embed.addField(`${placestring} Place:`, `${user} : ${points}`);
    }
    await interaction.editReply({ embeds: [embed] });
    console.info(`Displayed a leaderboard!`);
  },
};

function getOrd(i) {
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
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["whoswinning"],
  permLevel: "User",
  pointRec: 0,
};

exports.help = {
  name: "leaderboard",
  category: "Points",
  description: "See who has the most points",
  usage: "leaderboard {number of players to view}",
};
