exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
    if (message.author.id == '504059340890570777')
    {
        const msg = message.author.send("You are big dumb dumb.");

    }
    else{
        const msg = message.channel.send("Jack's eyes only.");

    }
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