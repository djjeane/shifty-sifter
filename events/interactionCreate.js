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
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  },
};
