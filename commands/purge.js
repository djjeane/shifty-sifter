exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    
    var amount = args[0];
    if (!amount) return msg.reply('You haven\'t given an amount of messages which should be deleted!'); // Checks if the `amount` parameter is given
    if (isNaN(amount)) return msg.reply('The amount parameter isn`t a number!'); // Checks if the `amount` parameter is a number. If not, the command throws an error

    if (amount > 100) return msg.reply('You can`t delete more than 100 messages at once!'); // Checks if the `amount` integer is bigger than 100
    if (amount < 1) return msg.reply('You have to delete at least 1 message!'); // Checks if the `amount` integer is smaller than 1

    message.channel.bulkDelete(amount+1).then(() => {
        message.channel.send(`Deleted ${amount} messages.`).then(msg => msg.delete(30000));
    });

    };

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User",
    pointRec: 0
};

exports.help = {
    name: "purge",
    category: "Miscellaneous",
    description: "Deletes messages from the given channel",
    usage: "purge"
};