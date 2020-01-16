const Discord = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const embed = new Discord.RichEmbed()
        .setTitle("Points Leaderboard")
        .setColor(0x00AE86);
    var pointsList = await client.GetAllPoints();
    pointsList.sort((a,b) => b.points -a.points);
    for(var  i = 0; i < 5 ; i++){
        var element = pointsList[i];
        var points = element.points;
        if(points == 0) break;
        console.log(element.userID)
        var user = message.guild.members.get(element.userID);
        console.log(user)
        embed.addField(`${await client.getOrd(i+1)} Place:`, `${user} : ${points}`);
    }
    message.channel.send(embed)
    console.log(typeof pointsList);
    console.log(pointsList);
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['whoswinning'],
    permLevel: "User",
    pointRec: 0
};

exports.help = {
    name: "leaderboard",
    category: "Points",
    description: "See who has the most points",
    usage: "leaderboard"
};