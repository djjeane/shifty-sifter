exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
    if (message.author.id == '504059340890570777')
    {
        const msg = message.author.send("You are big dumb dumb.");

    }
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