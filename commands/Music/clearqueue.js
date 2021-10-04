const { SlashCommandBuilder } = require('@discordjs/builders');
var env = require('dotenv').config();
const { Song,MusicQueue } = require('../../modules/MusicQueue');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clearqueue')
		.setDescription('Clears the current music queue!'),
	async execute(interaction) 
    {
        let len = MusicQueue.Songs.length;
        MusicQueue.Songs = [];
		await interaction.reply(`Cleared Music Queue, ${len} songs were removed!`);
	},
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User",
	pointRec: 0
};

exports.help = {
	name: "ping",
	category: "Miscellaneous",
	description: "It like... Pings. Then Pongs. And it's not Ping Pong.",
	usage: "ping"
};
