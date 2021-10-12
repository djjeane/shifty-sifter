const { SlashCommandBuilder } = require('@discordjs/builders');
const glob = require('glob');
var fs = require('fs');
const { MessageAttachment, MessageEmbed } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('dickpic')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        var dick = random_pic();
        const imagePath = "../../Dicks/" + dick;

        const file = new MessageAttachment(imagePath);
        const exampleEmbed = new MessageEmbed()
            .setTitle('This is a dick pick.')
            .setImage('attachment://' + dick);

        interaction.reply({ embeds: [exampleEmbed], files: [file] });
    }
};

function random_pic() {
    var files = fs.readdirSync('././Dicks/')
    return files[Math.floor(Math.random() * files.length)]
}

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