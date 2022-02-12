const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const MongoHelper = require("../../modules/MongoHelper");
const SlotMachine = require("../../modules/SlotMachine");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slots")
    .setDescription("Replies with Pong!")
    .addIntegerOption((option) =>
      option
        .setName("wager")
        .setDescription(
          "The minutes before the event that users should be reminded"
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    let wager = interaction.options.getInteger("wager");

    var slotMachine = new SlotMachine();
    var Results = slotMachine.Play();

    for (let i = 0; i < 10; i++) {
      setTimeout(async () => {
        let resultsEmbed = new MessageEmbed()
          .setTitle("Slot Machine")
          .setDescription(Results.SlotsSlideShow[i])
          .setColor("RANDOM")
          .setFooter("are you lucky bitch?");

        interaction.editReply({ embeds: [resultsEmbed] });
      }, 400);
    }

    if (Results.Won) {
      setTimeout(() => {
        interaction.channel.send(
          `You WON and trippled your bet! Gained ${wager * 3} points!`
        );
        MongoHelper.UpdatePoints(interaction.member.id, wager * 3);
      }, 4100);
    } else {
      setTimeout(() => {
        interaction.channel.send(
          `You LOST and lost your bet! Lost ${wager} points! \n `
        );
        MongoHelper.UpdatePoints(interaction.member.id, wager * -1);
      }, 4500);
    }

    setTimeout(async () => {
      var points = await MongoHelper.GetPoints(interaction.member.user.id);
      interaction.channel.send(`Total points now at: ${points}`);
    }, 5000);
  },
  settings: {
    cost: 10,
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
