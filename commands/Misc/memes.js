const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("memes")
    .setDescription("Gets a random"),
  async execute(interaction) {
    //get the random meme with axios
    const { data } = await axios.get("https://meme-api.herokuapp.com/gimme");
    const embed = new MessageEmbed()
      .setTitle(data.title)
      .setImage(data.url)
      .setColor(0x00ae86);

    interaction.editReply({ embeds: [embed] });
  },
  settings: {
    cost: 10,
  },
};
