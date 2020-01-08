exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    
    message.author.send('No Bitch.');
    message.channel.send('I have answered the call.');

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "ping",
    category: "Miscelaneous",
    description: "It like... Pings. Then Pongs. And it's not Ping Pong.",
    usage: "ping"
};