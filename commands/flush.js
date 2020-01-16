let index = require('../index.js')
exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars

    message.channel.send('Its hard to imagine a life without you all.. oh wait, I just did.');

    const authorID = message.member.voiceChannel;
    const channels = message.guild.channels.filter(c => c.type === 'voice');
    var flushedChannel = index.setFlushedChannel(message.member.voiceChannel.id);

    for (const [channelID, channel] of channels) {
        for (const [memberID, member] of channel.members) {

            if (message.member.voiceChannel.id === channelID) {
                if (memberID != message.member.id) {
                    console.log(`Moved Member`)
                    member.setVoiceChannel(message.guild.afkChannelID);
                }
            }
        }
    }
    
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['byebye', 'latergaybois','latergayboys'],
    permLevel: "User",
    pointRec: 50

};

exports.help = {
    name: "flush",
    category: "VoiceChannels",
    description: "Moves all the turds to the U bend.",
    usage: "flush"
};