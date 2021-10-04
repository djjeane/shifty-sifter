let games = require('../../index.js').games;
let tempChannels = require('../../index.js').tempChannels;
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('assemble')
		.setDescription('Brings back togethers teams that were split.'),
	async execute(interaction) {
		var redChannel = message.guild.channels.find(ch=> ch.name == "Red Team");
        var blueChannel = message.guild.channels.find(ch => ch.name == "Blue Team");

        console.log(redChannel);
        console.log(blueChannel);

        if(redChannel != null && blueChannel != null)
        {    
            message.channel.send('Kissing and making up.')
            for (const [memberID, member] of blueChannel.members)
            {
                var prom = await member.setVoiceChannel('433786053397184533');
            }
            for (const [memberID, member] of redChannel.members)
            {
                var prom2 = await member.setVoiceChannel('433786053397184533');
            }
            redChannel.delete();
            blueChannel.delete();

            
        }
        else
        {
            message.channel.send('There is nothing to flush away...');
        }
	},
};



exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['avengers','unsplit','undosplit'],
    permLevel: "User",
    pointRec: 0
};

exports.help = {
    name: "assemble",
    category: "VoiceChannels",
    description: "Moves all the teams back to bowl.",
    usage: "assemble"
};
