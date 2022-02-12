let index = require("../../index.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("flush")
    .setDescription("flushs all the turds down the drain"),
  async execute(interaction) {
    message.channel.send(
      "Its hard to imagine a life without you all.. oh wait, I just did."
    );

    const authorID = message.member.voiceChannel;
    const channels = message.guild.channels.filter((c) => c.type === "voice");
    var flushedChannel = index.setFlushedChannel(
      message.member.voiceChannel.id
    );

    for (const [channelID, channel] of channels) {
      for (const [memberID, member] of channel.members) {
        if (message.member.voiceChannel.id === channelID) {
          if (memberID != message.member.id) {
            console.log(`Moved Member`);
            member.setVoiceChannel(message.guild.afkChannelID);
          }
        }
      }
    }
  },
};
