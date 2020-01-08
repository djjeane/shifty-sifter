
import games from '../index';
import tempChannels from '../index';

module.exports = {
    name: 'clear',
    description: 'Clears all the temporary channels.',
    execute(message, args) {
        if (module.exports.validateCommand(message)) {
            message.channel.send('I have heard your message and will reply shortly my son.');
            module.exports.sortMembers(message);
        } else {
            message.channel.send('You must be in an active voice channel to use this command');
        }
    },
    validateCommand: function (message) {
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
        return valid;
    },
    sortMembers: function (message)
    {
        const channels = message.guild.channels.filter(c => c.type === 'voice');
        //Loop through each voice channel and then every user in a channel
        for (const [channelID, channel] of channels) {
            for (const [memberID, member] of channel.members) {
                var game = member.user.presence.game;
                //ensure you dont move someone who isnt playing a game
                if (game != null) {
                    //check for a custom status
                    if (game.name != "Custom Status" && game.name != "Spotify") {
                        message.channel.send(`${member.user.tag} is playing ${game.name}`)
                            .then(() => console.log(`Moved ${member.user.tag}.`))
                            .catch(console.error);

                        //If you have already created the channel for the game
                        if (games.includes(game.name)) {
                            for (const [channelID, channel] of channels) {
                                if (channel.name == game.name) {
                                    member.setVoiceChannel(channelID);
                                }
                            }
                        } else {
                            if (channel.name != game.name) {
                                //make sure a channel doesnt already exist
                                for (const [channelID, channel] of channels) {
                                    console.log(channel.name);
                                    if (channel.name == game.name) {
                                        member.setVoiceChannel(channelID);
                                        return;
                                    }
                                }
                                //if the channel doesnt exist create one, log the game and log the temp channel
                                message.guild.createChannel(game.name, 'voice')
                                    .then(async channel => {
                                        var game = member.user.presence.game;
                                        games.push(game.name);
                                        tempChannels.push({
                                            newID: channel.id,
                                            guild: channel.guild
                                        })
                                        await member.setVoiceChannel(channel.id)
                                    });
                            }

                        }
                    }

                }
            }
        }
    }
};