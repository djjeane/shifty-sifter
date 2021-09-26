let index = require('../index.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		if (index.getTempChannels().length >= 0) {
      for (let i = 0; i < index.getTempChannels().length; i++) {
        // console.log(`List of Channels is ${index.getTempChannels()}`);
        // console.log(`${i} out of ${index.getTempChannels().length}`);
        console.log(`Current Channel: ${index.getTempChannel(i)}`);

        console.log(message.guild.channels)
        let ch = message.guild.channels.find(
          x => x.id == index.getTempChannel(i).newID
        );
        console.log(`Current Channel is ${ch}`);
        // Channel Found!
        if (ch != null)
        {
            if (ch.members.size <= 0)
            {
                var gameName = ch.name;
                for (var j = 0; j < index.getGames().length; j++)
                {
                    if (index.getGames()[j] === gameName)
                    {
                        index.getGames().splice(j, 1);
                        console.log(`${gameName} was removed from the list.`);
                        console.log(index.getGames());
                    }
                }
                ch.delete();
                // Channel has been deleted!

                index.getTempChannels().splice(i, 1);
                i = i - 1;
                index.getTempChannels().length = index.getTempChannels().length;
            }
            else
            {
                console.log("Channel still has members");
            }
        }
        else
        {
          console.log("Channel was null");
        }
      }
    }
	},
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['fuckthosechannels',''],
    permLevel: "User",
    pointRec: 0

};

exports.help = {
    name: "clear",
    category: "VoiceChannels",
    description: "Deletes all the empty channels created from the sort command.",
    usage: "clear"
};