const fs = require("fs");
var WheelCooldowns = require('../../models/WheelCooldown.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Helper = require('../../modules/MongoHelper.js');
const { Interaction } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('spinthewheel')
		.setDescription('Replies with Pong!'),
	async execute(interaction) 
    {
        var today = Date.now();
        var userCooldown = new Date(await Helper.GetWheelCooldown(message.author.id));

        if(userCooldown.getTime() > today)
        {
            var time = client.msToTime(userCooldown.getTime() - today);
            message.reply(`You can spin again in ${time}`);
        }
        else
        {
            
            Helper.UpdateCooldown(message.author.id)
            var points = await Helper.GetPoints(message.author.id);
            
            var gainedPoints = Math.floor(Math.random() * (11 - 1) + 1);
            var outMessage = `You gained ${gainedPoints} points, bringing you to ${gainedPoints + points} points.`;
    
            if(gainedPoints == 10 || gainedPoints == 1)
            {
                var resMess = `You have hit a ${gainedPoints} , you have the option to reroll. Respond @Sifty !spinthewheel to roll again.`
                

                //Do clever response handling here
                const response = await client.awaitReply(message, resMess, message.author.id);


                if (response != null)
                {
                    if (resArray[1] == '!spinthewheel') 
                    {
                        var secondRollPoints = Math.floor(Math.random() * (11 - 1) + 1);
                        var total = secondRollPoints + gainedPoints;

                        if(total == 20)
                        {
                            gainedPoints = points;
                            outMessage = `You rolled another 10 which DOUBLES YOUR FUCKING POINTS, bringing you to ${points + points} points.`;
                        }
                        else if(total == 2){
                            gainedPoints = -points;
                            outMessage = `You rolled another 1 which loses you all your points. Watch all your gold wash down the drain.`;
                        }
                        else{
                            gainedPoints = total;
                            outMessage = `You rolled a ${temp}. You gained ${gainedPoints} points, bringing you to ${total} points.`;
                        }
    
                    } 
                }
            }
            client.UpdatePoints(message.author.id,gainedPoints)
            message.reply(outMessage)
        }
	},
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

