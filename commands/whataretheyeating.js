exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const msg = message.author.send("Jack is big dumb dumb");
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['isjackdumbdumb'],
    permLevel: "User"
};

exports.help = {
    name: "whataretheyeating",
    category: "Miscellaneous",
    description: "Just for Jack, cool kids stay away",
    usage: "whataretheyeating"
};