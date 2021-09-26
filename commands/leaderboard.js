const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Helper = require('../modules/MongoHelper.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Shows the leaderboard of the current point holders.')
        .addIntegerOption(option => option.setName('numusers').setDescription('Enter a number of users to display.')),
	async execute(interaction) {
        await interaction.deferReply();
        let numPlayers = interaction.options.getInteger('numusers');
        if(!numPlayers)
        {
            numPlayers = 5;
        }
		const embed = new MessageEmbed()
            .setTitle("Points Leaderboard")
            .setColor(0x00AE86);
        var pointsList = await Helper.GetAllPoints();
        pointsList.sort((a, b) => b.points - a.points);        
        
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
        await interaction.editReply({ embeds: [embed] })
        console.info(`Displayed a leaderboard!`);
	},
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