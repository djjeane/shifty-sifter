const fs = require("fs");
exports.run = async(client, message, args, level) => { // eslint-disable-line no-unused-vars
    let points = JSON.parse(fs.readFileSync("./points.json", "utf8"));
    if(!points[message.author.id])
    {
        message.reply(`You have 0 points.`);
        return;
    }
    var userData = points[message.author.id];
    message.reply(`You have ${userData.points} points!`)
    return;
    
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['spin'],
    permLevel: "User"
};

exports.help = {
    name: "points",
    category: "Miscellaneous",
    description: "Shows you have many points you have.",
    usage: "points",
};