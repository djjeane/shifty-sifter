const YouTube = require("discord-youtube-api");
const ytdl = require('ytdl-core');
var env = require('dotenv').config();
const youtube = new YouTube(process.env.GOOGLE_API_KEY);
const { SlashCommandBuilder } = require('@discordjs/builders');
const  MusicManager  = require('../../modules/MusicManager')
const { Song, MusicQueue } = require('../../modules/MusicQueue');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays the audio from a youtube search or url.')
		.addStringOption(option => option.setName('search').setDescription('Enter a youtube search that returns what video you wish to hear.')),
	async execute(interaction) 
	{
		await interaction.deferReply();

		let search = interaction.options.getString('search');

		//Find the url of the song, or determine if its been passed in
		if (ytdl.validateURL(search)) {
			var url = search;
		}
		else {
			var url = await SearchYoutube(search);
		}

		const songInfo = await ytdl.getInfo(url);

		//Declare a new song
		let song = new Song(interaction.member.voice.channel,interaction.channel, songInfo.videoDetails.video_url,songInfo.videoDetails.title);
		if(!MusicManager.CurrentlyPlaying)
		{
			MusicQueue.AddSong(song,interaction.guild);
			MusicManager.PlayNextSong();
			await interaction.editReply(`Now Playing Song : ${song.SongInfo.Title}!`);
		}
		else
		{
			MusicQueue.AddSong(song,interaction.guild);
			await interaction.editReply(`Queued song : ${song.SongInfo.Title}! This song is in place: ${MusicQueue.Songs.length}`);
		}


	},
};

async function SearchYoutube(search) {
	console.log(`Searching youtube video with search param: ${search}`);
	var video = await youtube.searchVideos(search);
	console.log(`Found video with id: ${String(video.id)}`);
	return `https://www.youtube.com/watch?v=${video.id}`;
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User",
	pointRec: 0
};

exports.help = {
	name: "play",
	category: "Sounds",
	description: `Plays a stream of the youtube video linked.`,
	usage: "play"
};
