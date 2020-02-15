var index = require('../index.js')
exports.moveMembers = (message) => {
    const channels = message.guild.channels.filter(c => c.type === 'voice');
    console.log(`Games: ${index.getGames()}`)
    console.log(`TempChannels: ${index.getTempChannels()}`)
    for (const [channelID, channel] of channels) {
        for (const [memberID, member] of channel.members) {
            //var games = require('../index.js').games;
            //var tempChannels = require('../index.js').tempChannels;
            if (message.member.voiceChannel.id === channelID) {
                var game = member.user.presence.game;
                console.log(`Current Game: ${game}`)
                //ensure you dont move someone who isnt playing a game
                if (game != null) {
                    //check for a custom status
                    if (game.name != "Custom Status" && game.name != "Spotify") {
                        message.channel.send(`${member.user.tag} is playing ${game.name}`)
                            .then(() => console.log(`Moving ${member.user.tag}.`))
                            .catch(console.error);

                        console.log(`games ${index.getGames()}`)
                        console.log(`tempChannels ${index.getTempChannels()}`)

                        //If you have already created the channel for the game
                        if (index.getGames().includes(game.name))
                        {
                            let channels2 = message.guild.channels.filter(c => c.type === 'voice');

                            for (const [channelID, channel] of channels2)
                            {
                                console.log(`Game Name: ${game.name} || ChannelName ${channel.name}`)
                                if (channel.name == game.name)
                                {
                                    member.setVoiceChannel(channelID);
                                }
                            }
                        }

                    }

                }
            }
        }
    }

  }; 