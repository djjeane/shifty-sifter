const { SlashCommandBuilder } = require('@discordjs/builders');
const Helper = require('../../modules/MongoHelper.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('howmanypoints')
		.setDescription('Displays how much wealth has been accrued!'),
	async execute(interaction) 
    {
		var foundPointRecord = await Helper.GetPoints(interaction.member.user.id);
        interaction.reply(`You have ${foundPointRecord} points.`)
	},
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['howmanypoints','amirich','points'],
    permLevel: "User",
    pointRec: 0
};

exports.help = {
    name: "points",
    category: "Points",
    description: "Shows you have many points you have.",
    usage: "points",
};