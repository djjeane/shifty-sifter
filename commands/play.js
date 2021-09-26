const YouTube = require("discord-youtube-api");
const ytdl = require('ytdl-core');
var env = require('dotenv').config();
const youtube = new YouTube(process.env.GOOGLE_API_KEY);
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays the audio from a youtube search or url.'),
	async execute(interaction) {
    if (args.length != 0) {

      if (isValidHttpUrl(args[0])) {
        var url = args[0];
      }
      else {
        var url = await SearchYoutube(args);
      }
      try {
  
  
        const voiceChannel = message.member.voiceChannel;
  
        if (voiceChannel) {
          if (client.voice.connections.some(conn => conn.channel.id == voiceChannel.id)) 
          {
              const connection = message.guild.voiceConnection;
              connection.channel.leave();
              voiceChannel.join().then(connection => {
                console.log('joined channel');
                connection.playStream(ytdl(url).on('end', () => {
                  console.log(`Disconnecting from the voice channel.`);
                  connection.channel.leave();
                }));
              }).catch(e => {
                console.error(e);
              });
  
          }
          voiceChannel.join().then(connection => {
            console.log('joined channel');
            connection.playStream(ytdl(url).on('end', () => {
              console.log(`Disconnecting from the voice channel.`);
              connection.channel.leave();
              connection.destroy();
            }));
          }).catch(e => {
            console.error(e);
          });
        }
      }
      catch(error)
      {
        console.error(error);
      }
    }
    else 
    {
      message.reply('Invalid link or search.');
    }
	},
};


exports.run = async (client, message, args, level) => {
  if (args.length != 0) {

    if (isValidHttpUrl(args[0])) {
      var url = args[0];
    }
    else {
      var url = await SearchYoutube(args);
    }
    try {


      const voiceChannel = message.member.voiceChannel;

      if (voiceChannel) {
        if (client.voice.connections.some(conn => conn.channel.id == voiceChannel.id)) 
        {
            const connection = message.guild.voiceConnection;
            connection.channel.leave();
            voiceChannel.join().then(connection => {
              console.log('joined channel');
              connection.playStream(ytdl(url).on('end', () => {
                console.log(`Disconnecting from the voice channel.`);
                connection.channel.leave();
              }));
            }).catch(e => {
              console.error(e);
            });

        }
        voiceChannel.join().then(connection => {
          console.log('joined channel');
          connection.playStream(ytdl(url).on('end', () => {
            console.log(`Disconnecting from the voice channel.`);
            connection.channel.leave();
            connection.destroy();
          }));
        }).catch(e => {
          console.error(e);
        });
      }
    }
    catch(error)
    {
      console.error(error);
    }
  }
  else 
  {
    message.reply('Invalid link or search.');
  }
};

async function SearchYoutube(args) {
  var search = args.join(' ');
  console.log(`Searching youtube video with search param: ${search}`);
  var video = await youtube.searchVideos(search);
  console.log(`Found video with id: ${String(video.id)}`);
  return `https://www.youtube.com/watch?v=${video.id}`;
}

function isValidHttpUrl(testURl) {
  let url;

  try {
    url = new URL(testURl);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
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
