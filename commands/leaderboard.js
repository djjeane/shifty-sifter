const Discord = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const embed = new Discord.RichEmbed()
        .setTitle("Points Leaderboard")
        .setColor(0x00AE86);
    var pointsList = await client.GetAllPoints();
    pointsList.sort((a, b) => b.points - a.points);

    if (args.length == 0) {
        var numPlayers = 5;
    }
    else {
        if (args[0].toLowerCase() == 'all') {
            var numPlayers = pointsList.length;
        }
        else {
            var numPlayers = Math.abs(parseInt(args[0]));
            if (typeof numPlayers != 'number' || isNaN(numPlayers)) {
                message.reply('You can only view an integer value of players')
                return;
            }
        }
    }
    if (pointsList.length - numPlayers < 0) {
        numPlayers = pointsList.length
    }
    for (var i = 0; i < numPlayers; i++) {
        var element = pointsList[i];
        var points = element.points;

        if (points == 0) break;
        var placestring = await client.getOrd(i + 1);
        var user = await client.fetchUser(element.userID);
        embed.addField(`${placestring} Place:`, `${user} : ${points}`);
        console.log(user.username);
    }
    message.channel.send(embed)
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
    usage: "leaderboard {number of players to view}"
};