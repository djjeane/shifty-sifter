module.exports = {
    name: 'flush',
    description: 'Takes away assholes',
    execute(msg, args) {
        msg.channel.send('Its hard to imagine a life without you all.. oh wait, I just did.');
        module.exports.moveUsersToAFK();

    },
    moveUsersToAFK: function (req, res, next) {
        const authorID = message.guild.author.voiceChannel;
        console.log(`Flushed by ${message.author}`)

        for (const [channelID, channel] of channels) {
            for (const [memberID, member] of channel.members) {
                if (message.author.voiceChannel == channelID) {
                    if (memberID != message.author.id) {
                        member.setVoiceChannel(message.guild.afkChannelID);
                    }
                }
            }
        }
    }
};