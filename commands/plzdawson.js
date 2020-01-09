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
    name: "plzdawson",
    category: "Miscellaneous",
    description: "Does Dawson want to play Divinity 2?",
    usage: "plzdawson"
};