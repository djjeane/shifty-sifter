const Points  = require("../models/Points.js");
const mongoose = require("mongoose")
const Discord = require('discord.js')

exports.run = async(client, message, args, level) => { // eslint-disable-line no-unused-vars
    
    var foundPointRecord = await client.GetPoints(message.author.id);
    if(foundPointRecord.length == 0){
        await client.CreatePointRecord(message.author.id)
        message.reply(`You have 0 points.`)
    }
    else
    {
        console.log(foundPointRecord)
         message.reply(`You have ${foundPointRecord} points.`)
    }  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['howmanypoints','amirich'],
    permLevel: "User",
    pointRec: 0
};

exports.help = {
    name: "points",
    category: "Points",
    description: "Shows you have many points you have.",
    usage: "points",
};