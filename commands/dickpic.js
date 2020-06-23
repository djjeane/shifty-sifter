let index = require('../index.js');
const Discord = require('discord.js');
exports.run = async (client, message, args, level) => {
    var dickPics = index.getDickPics();

    console.log(dickPics);
    var dick = dickPics[Math.floor(Math.random() * dickPics.length)];
    console.log(dick);
    dick = dick.concat('.jpg');
    const imagePath = "./Dicks/" + dick;

    message.author.send("This is a dick pic.", {
        files: [
        `${imagePath}`,
            ]
        });
    message.channel.send('Ask and Receive');

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['plzSendMeADick'],
    permLevel: "User",
    pointRec: 0
};

exports.help = {
    name: "dickpic",
    category: "Miscellaneous",
    description: "Do you want a dick pic?",
    usage: "dickpic"
};