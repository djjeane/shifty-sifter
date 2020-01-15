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
    console.log(require('../models/Points.js'))
    const doc = await Points.find();
    console.log(doc instanceof Points)
    console.log(doc instanceof mongoose.Model)
    console.log(doc instanceof mongoose.Document)
    // let embed = new Discord.RichEmbed()
    //     .setTitle("Points")
    //     .setThumbnail(message.author.displayAvatarURL);

    // let data = client.GetPoints(message.author.id);
    // if(data)
    // {
    //     console.log(require("../models/PointRecord.js").points)
    //     console.log(data)
    // }
    // else
    // {
    //     console.log('here oh no')
    // }
    // console.log(data);

    // PointRecord.find({
    //     id: message.author.id,
    // }, (err, res) => {
    //     if (err) console.log(err);

    //     if (!res) {
    //         embed.setColor("RED");
    //         embed.addField("Error", "Sorry, you don't have any points.");
    //     } else {
    //         embed.setColor("GREEN");
    //         embed.addField(res.username, res.coins + " points.");
    //     }

    //     message.channel.send(embed)

    // })
    
    
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