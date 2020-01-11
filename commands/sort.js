var games = require('../index.js').games;
var tempChannels = require('../index.js').tempChannels;

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const channels = message.guild.channels.filter(c => c.type === 'voice');


    var valid = false
    var user = message.author;
    for (const [channelID, channel] of channels) {
        for (const [memberID, member] of channel.members) {
            if (memberID == user.id) {
                valid = true;
            }
        }

    }
    if (valid) 
    {
        message.channel.send('I have heard your message and will reply shortly my son.');
        const channels = message.guild.channels.filter(c => c.type === 'voice');
        //Loop through each voice channel and then every user in a channel
        for (const [channelID, channel] of channels) {
            for (const [memberID, member] of channel.members) {
                var game = member.user.presence.game;
                console.log(game)
                //ensure you dont move someone who isnt playing a game
                if (game != null) {
                    //check for a custom status
                    if (game.name != "Custom Status" && game.name != "Spotify") {
                        message.channel.send(`${member.user.tag} is playing ${game.name}`)
                            .then(() => console.log(`Moved ${member.user.tag}.`))
                            .catch(console.error);

                        //If you have already created the channel for the game
                        if (games.includes(game.name))
                        {
                            for (const [channelID, channel] of channels)
                            {
                                console.log(`Game Name: ${game.name} || ChannelName ${channel.name}`)
                                if (channel.name == game.name)
                                {
                                    member.setVoiceChannel(channelID);
                                }
                            }
                        }
                        else
                        {
                            if (channel.name != game.name) {
                                //make sure a channel doesnt already exist
                                for (const [channelID, channel] of channels) {
                                    console.log(channel.name);
                                    if (channel.name == game.name) {
                                        member.setVoiceChannel(channelID);
                                        break;
                                    }
                                }
                                //if the channel doesnt exist create one, log the game and log the temp channel
                                message.guild.createChannel(game.name, 'voice')
                                    .then(async channel => {
                                        var game = member.user.presence.game;
                                        games.push(game.name);
                                        console.log(`Games ${games}`)
                                        tempChannels.push({
                                            newID: channel.id,
                                            guild: channel.guild
                                        })
                                        console.log(`TempChannels  ${tempChannels}`)

                                        channel.setParent('433786053397184532');
                                        await member.setVoiceChannel(channel.id)
                                    });
                            }

                        }
                    }

                }
            }
        }
    } 
    else 
    {
        message.channel.send('You must be in an active voice channel to use this command');
    }
    if(games == null)
    {
        message.channel.send('No one is playing any games!!!!!! Dont waste my time man.');

    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User",
};

exports.help = {
    name: "sort",
    category: "Miscellaneous",
    description: "Take away all those loud pee sounds when the toilets are too close together.",
    usage: "sort"
};