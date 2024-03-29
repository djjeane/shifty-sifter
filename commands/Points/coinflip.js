const fs = require("fs");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Helper = require("../../modules/MongoHelper.js");
const { Interaction } = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("flipthecoin")
    .setDescription("Replies with Pong!")
    .addIntegerOption((option) =>
      option
        .setName("amounttobet")
        .setDescription("Enter a number of points to bet.")
    )
    .addStringOption((option) =>
      option
        .setName("makeyourchoice")
        .setDescription(`Heads or tails???`)
        .addChoice("Heads", "0")
        .addChoice("Tails", "1")
    ),
  async execute(interaction) {
    var points = await Helper.GetPoints(interaction.member.user.id);

    //logic determining coinflip result
    var gainedPoints = 0;
    var wager = interaction.options.getInteger("amounttobet");
    var outcome = Math.floor(Math.round(Math.random()));
    var userChoice = parseInt(interaction.options.getString("makeyourchoice"));
    if (outcome == userChoice) {
      gainedPoints = 2 * wager;
      await interaction.editReply({
        content: `You called it! and you have doubled your money gaining ${gainedPoints} Points! You currently have ${
          points + gainedPoints
        }.`,
      });
    } else {
      gainedPoints -= wager;
      await interaction.editReply({
        content: `Not this time, unfortunately you guessed incorrectly. You lost ${Math.abs(
          gainedPoints
        )} Points! You currently have ${points + gainedPoints}.`,
      });
    }
    //updates user points in mongo
    Helper.UpdatePoints(interaction.member.user.id, gainedPoints);
  },
};
