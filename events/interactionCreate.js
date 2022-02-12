const Helper = require("../modules/MongoHelper.js");

async function PayCost(command, interaction) {
  if (command.settings) {
    if (command.settings.cost > 0) {
      var points = await Helper.GetPoints(interaction.member.user.id);
      if (points < command.settings.cost) {
        await interaction.editReply({
          content: "You don't have enough points to use this command!",
          ephemeral: true,
        });
        return false;
      } else {
        await Helper.AddPoints(
          interaction.member.user.id,
          -command.settings.cost
        );
        return true;
      }
    }
  }
  return true;
}

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (interaction.isSelectMenu()) {
      var listener = interaction.client.selectMenuListeners.get(
        interaction.customId
      );

      if (!listener) return;

      try {
        await listener.Execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    } else {
      await interaction.deferReply();
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) return;

      try {
        if (await PayCost(command, interaction)) {
          await command.execute(interaction);
        }
      } catch (error) {
        console.error(error);
        await interaction.editReply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  },
};
