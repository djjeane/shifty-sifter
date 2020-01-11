exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
    var killNumber = Math.random() * (10 - 1) + 1;

    if(killNumber == 5)
    {
        const member = message.guild.member(message.author.id);
        member.ban({
            reason: 'You knew the risks!',
        }).then(() => {
            message.reply(`You have tempted the gods ${user.tag} and you will be punished.`);
        }).catch(err => {
            message.reply('I was unable to ban the member');
            // Log the error
            console.error(err);
        });
    }
    else
    {
        message.reply("You won this time, challenge a friends honor.")
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