exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const msg = await message.channel.send("Ping!");
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "pong",
    category: "Miscellaneous",
    description: "Ping Ping Ping Ping Ping Ping Ping Ping Ping Ping Ping Ping Ping Ping Ping Ping Ping Ping Ping Ping Ping",
    usage: "ping"
};