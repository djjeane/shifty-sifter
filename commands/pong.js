exports.run =  (client, message, args, level) => { // eslint-disable-line no-unused-vars
    message.channel.send("Ping!");
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User",
    pointRec: 0
};

exports.help = {
    name: "pong",
    category: "Miscellaneous",
    description: "Ping Ping Ping Ping Ping Ping Ping Ping Ping Ping Ping Ping Ping Ping Ping Ping Ping Ping Ping Ping Ping",
    usage: "ping"
};