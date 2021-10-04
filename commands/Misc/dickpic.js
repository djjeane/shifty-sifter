let index = require('../../index.js');
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dickpic')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		var dickPics = index.getDickPics();
        var dick = dickPics[Math.floor(Math.random() * dickPics.length)];
        dick = dick.concat('.jpg');
        const imagePath = "./Dicks/" + dick;

        message.author.send("This is a dick pic.", {
            files: [
            `${imagePath}`,
                ]
            });
        message.channel.send('Ask and Receive');
        },
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