exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
    
    message.author.send('Okay, sure.');
    message.channel.send('I have answered the call.');

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['saynotime'],
    permLevel: "User",
    pointRec: 0
};

exports.help = {
    name: "plzdawson",
    category: "Miscellaneous",
    description: "Does Dawson want to play Divinity 2?",
    usage: "plzdawson"
};
