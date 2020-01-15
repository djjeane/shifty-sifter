const Points  = require("../models/Points.js");
const mongoose = require("mongoose")
const Discord = require('discord.js')
// mongoose.connect('mongodb+srv://djjeane:CleanCode123@siftydb-6b84b.mongodb.net/test?retryWrites=true&w=majority', {
//     useNewUrlParser: true
// }, err => {
//     if (err) console.error(err);
//     //console.log(mongoose);
// });
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
    aliases: ['spin'],
    permLevel: "User"
};

exports.help = {
    name: "points",
    category: "Miscellaneous",
    description: "Shows you have many points you have.",
    usage: "points",
};