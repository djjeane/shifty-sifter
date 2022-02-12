const fs = require("fs");
var WheelCooldowns = require("../../models/WheelCooldown.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Helper = require("../../modules/MongoHelper.js");
const { Interaction } = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("spinthewheel")
    .setDescription("Replies with Pong!"),
  async execute(interaction) {
    var now = Date.now();
    var userCooldown = new Date(
      await Helper.GetWheelCooldown(interaction.member.user.id)
    );

    if (userCooldown.getTime() > now) {
      var time = client.msToTime(userCooldown.getTime() - now);
      interaction.editReply(`You can spin again in ${time}`);
      return;
    }

    Helper.UpdateCooldown(interaction.member.user.id);
    var points = await Helper.GetPoints(interaction.member.user.id);

    var gainedPoints = Math.floor(Math.random() * (11 - 1) + 1);

    if (gainedPoints == 10 || gainedPoints == 1) {
      let style = "PRIMARY";
      let message = "Spin Again?";
      if (gainedPoints == 1) {
        style = "DANGER";
        message += ` Beware, another 1 will cost you all your points!`;
      }

      let row = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("primary")
          .setLabel(message)
          .setStyle(style)
      );
      await interaction.editReply({
        content: `You rolled a ${gainedPoints}! Click the button below to spin again!`,
        components: [row],
      });

      const filter = (i) =>
        i.customId === "primary" && i.user.id === interaction.member.user.id;

      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        time: 30000,
      });

      collector.on("collect", async (i) => {
        if (i.customId === "primary") {
          var secondRollPoints = Math.floor(Math.random() * (11 - 1) + 1);
          var total = secondRollPoints + gainedPoints;

          if (total == 20) {
            gainedPoints = points;
            outMessage = `You rolled another 10 which DOUBLES YOUR FUCKING POINTS, bringing you to ${
              points + points
            } points.`;
          } else if (total == 2) {
            gainedPoints = -points;
            outMessage = `You rolled another 1 which loses you all your points. Watch all your gold wash down the drain.`;
          } else {
            outMessage = `You rolled a ${secondRollPoints}. ${gainedPoints} + ${secondRollPoints} = ${total} gained points, which  brings you to ${
              points + total
            } points!`;
            gainedPoints = total;
          }

          await i.update({ content: outMessage, components: [] });
        }
      });

      collector.on("end", (collected) =>
        console.log(`Collected ${collected.size} items`)
      );
    } else {
      await interaction.editReply(
        `You gained ${gainedPoints} points, bringing you to ${
          gainedPoints + points
        } points.`
      );
    }

    Helper.UpdatePoints(interaction.member.user.id, gainedPoints);
  },
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["spin", "gimmethempoints"],
  permLevel: "User",
  pointRec: 0,
};

exports.help = {
  name: "spinthewheel",
  category: "Points",
  description: "Moves all the turds to the U bend.",
  usage: "spinthewheel",
};
