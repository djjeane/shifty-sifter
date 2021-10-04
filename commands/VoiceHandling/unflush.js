let index = require('../../index.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unflush')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
        message.channel.send('I bring the dead back to life.');
        var flushedChannel = index.getFlushedChannel();
        const channel = message.guild.channels.find(c => c.id === message.guild.afkChannelID);
        for (const [memberID, member] of channel.members) 
        {
            if(flushedChannel != "")
                member.setVoiceChannel(flushedChannel);
            else
                message.reply(`No one was flushed`);
        }
	},
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['unflush'],
    permLevel: "User",
    pointRec: 1
};

exports.help = {
    name: "plunge",
    category: "VoiceChannels",
    description: "I bring the dead back to life",
    usage: "plunge"
};
