const { SlashCommandBuilder } = require("@discordjs/builders");
const Ombi = require("../../modules/Ombi");
const { MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("plexrequest")
    .setDescription("Requests an invite to the plex server.")
    .addStringOption((option) =>
      option
        .setName("searchterm")
        .setDescription("The name of the tv show or movie you want to request.")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    Ombi.Search(interaction.options.getString("searchterm")).then(
      async (data) => {
        if (data.length > 0) {
          let options = [];
          data.forEach((element) => {
            options.push({
              label: element.title,
              description: element.mediaType,
              value: `${element.mediaType}-${element.id}`,
            });
          });

          const row = new MessageActionRow().addComponents(
            new MessageSelectMenu()
              .setCustomId("plexrequestresponse")
              .setPlaceholder("Nothing selected")
              .addOptions(options)
          );

          await interaction.editReply({
            content: "Please select an item.",
            components: [row],
            ephemeral: true,
          });
        } else {
          await interaction.editReply({
            content: "No results found!",
            ephemeral: true,
          });
        }
      }
    );
  },
};
