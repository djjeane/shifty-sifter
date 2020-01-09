exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars

    msg.channel.send('Its hard to imagine a life without you all.. oh wait, I just did.');

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
    
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "flush",
    category: "Miscellaneous",
    description: "Moves all the turds to the U bend.",
    usage: "flush"
};