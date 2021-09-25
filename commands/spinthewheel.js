const fs = require("fs");
let points = JSON.parse(fs.readFileSync("./points.json", "utf8"));
let cooldowns = JSON.parse(fs.readFileSync("./pointsCooldowns.json", "utf8"));
var WheelCooldowns = require('../models/WheelCooldown.js');
exports.run = async(client, message, args, level) => { // eslint-disable-line no-unused-vars
    var today = Date.now();
    var userCooldown = new Date(await client.GetWheelCooldown(message.author.id));
    console.log(userCooldown);
    if(userCooldown.getTime() > today)
    {
        var time = client.msToTime(userCooldown.getTime() - today);
    
        message.reply(`You can spin again in ${time}`);
    }
    else{
        
        client.UpdateCooldown(message.author.id)
        var points = await client.GetPoints(message.author.id);

        var gainedPoints = Math.floor(Math.random() * (11 - 1) + 1);
        var outMessage = `You gained ${gainedPoints} points, bringing you to ${gainedPoints + points} points.`;

        if(gainedPoints == 10 || gainedPoints == 1)
        {
            var resMess = `You have hit a ${gainedPoints} , you have the option to reroll. Respond @Sifty !spinthewheel to roll again.`
            const response = await client.awaitReply(message, resMess, message.author.id);
            if (response != null)
            {
                var resArray = response.split(" ");
                if (resArray[1] == '!spinthewheel') {
                    var temp = Math.floor(Math.random() * (11 - 1) + 1);
                    if(temp == 10 && gainedPoints == 10)
                    {
                        gainedPoints = points;
                        outMessage = `You rolled another 10 which DOUBLES YOUR FUCKING POINTS, bringing you to ${points + points} points.`;
                    }
                    else if(temp == 1 && gainedPoints == 1){
                        gainedPoints = -points;
                        outMessage = `You rolled another 1 which loses you all your points. Watch all your gold wash down the drain.`;
                    }
                    else{
                        gainedPoints = gainedPoints + temp;
                        outMessage = `You rolled a ${temp}. You gained ${gainedPoints} points, bringing you to ${gainedPoints + points} points.`;
                    }

                } else {

                }
            }
        }
        client.UpdatePoints(message.author.id,gainedPoints)
        message.reply(outMessage)
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['spin','gimmethempoints'],
    permLevel: "User",
    pointRec: 0
};

exports.help = {
    name: "spinthewheel",
    category: "Points",
    description: "Moves all the turds to the U bend.",
    usage: "spinthewheel",
};

