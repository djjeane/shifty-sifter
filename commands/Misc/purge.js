const { SlashCommandBuilder } = require("@discordjs/builders");
const { channel } = require("diagnostics_channel");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Replies with Pong!")
    .addIntegerOption((option) =>
      option
        .setName("number")
        .setDescription("Enter the number of messages to delete.")
    )
    .addBooleanOption((option) =>
      option
        .setName("recentonly")
        .setDescription("Delete Only recent Messages.")
    ),

  async execute(interaction) {
    let amount = interaction.options.getInteger("number");
    let recentOnly = interaction.options.getBoolean("recentonly");
    if (!amount || isNaN(amount)) {
      await interaction.reply(`You must enter a number of messages to delete.`);
    }
    if (recentOnly) {
      interaction.channel.bulkDelete(amount + 1);
    } else {
      const messages = await interaction.channel.messages.fetch({
        limit: amount,
      });

      const { size } = messages;
      var first = true;
      messages.forEach(async (message) => {
        if (first) {
          first = false;
        } else {
          await message.delete();
        }
      });
    }

    await interaction.reply(`Deleted ${amount} messages.`);
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
  name: "purge",
  category: "Miscellaneous",
  description: "Deletes messages from the given channel",
  usage: "purge x",
};
