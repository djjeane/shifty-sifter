const fs = require("fs");
let points = JSON.parse(fs.readFileSync("./points.json", "utf8"));
let cooldowns = JSON.parse(fs.readFileSync("./pointsCooldowns.json", "utf8"));
var WheelCooldowns = require('../models/WheelCooldown.js');
exports.run = async(client, message, args, level) => { // eslint-disable-line no-unused-vars
    var today = Date.now();
    var userCooldown = await client.GetWheelCooldown(message.author.id);
    if(userCooldown.getTime() > today)
    {
        var time = client.msToTime(userCooldown.getTime() - today);
    
        message.reply(`You can spin again in ${time}`);
    }
    else{
        client.UpdateCooldown(message.author.id)
        var points = await client.GetPoints(message.author.id);

        var gainedPoints = Math.floor(Math.random() * (10 - 1) + 1);
        client.UpdatePoints(message.author.id,gainedPoints)
        message.reply(`You gained ${gainedPoints} points, bringing you to ${gainedPoints + points} points.`)
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['spin'],
    permLevel: "User"
};

exports.help = {
    name: "spinthewheel",
    category: "Points",
    description: "Moves all the turds to the U bend.",
    usage: "spinthewheel",
};