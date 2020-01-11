let games = require('../index.js').games;
let tempChannels = require('../index.js').tempChannels;

exports.run = (client, message, args, level) => {
        var redChannel = message.guild.channels.filter(ch=> ch.name = "Red Team");
        var blueChannel = message.guild.channels.filter(ch => ch.name = "Blue Team");

        if(redChannel != null && blueChannel != null)
        {    
            message.channel.send('Moving members back to Bowl.')
            for (const [memberID, member] of redChannel.members) {
                member.setVoiceChannel('433786053397184533');
            }
            for (const [memberID, member] of blueChannel.members) {
                member.setVoiceChannel('433786053397184533');
            }
        }
        else
        {
            message.channel.send('There is nothing to flush away...')
        }

    },

    exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ['avengers','unsplit','undosplit'],
        permLevel: "User"
    };

exports.help = {
    name: "assemble",
    category: "Miscellaneous",
    description: "Moves all the teams back to bowl.",
    usage: "assemble"
};
