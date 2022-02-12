

const { Song, MusicQueue } = require('./MusicQueue');
const YouTube = require("discord-youtube-api");
const ytdl = require('ytdl-core');
var env = require('dotenv').config();
const { createReadStream } = require('fs');
const youtube = new YouTube(process.env.GOOGLE_API_KEY);
const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, VoiceConnectionStatus, createAudioResource , createAudioPlayer ,NoSubscriberBehavior ,AudioPlayerStatus, getVoiceConnection, StreamType  } = require('@discordjs/voice');

exports.JoinVoice = async () => 
{
    try 
    {
        let voiceConnection = getVoiceConnection(MusicQueue.Guild.id);

        if (!voiceConnection) 
        {
            voiceConnection = joinVoiceChannel({
                channelId: MusicQueue.Songs[0].VoiceChannel.id,
                guildId: MusicQueue.Guild.id,
                adapterCreator: MusicQueue.Guild.voiceAdapterCreator
            });

            voiceConnection.on(VoiceConnectionStatus.Ready, () => 
            {
                console.log('The connection has entered the Ready state - ready to play audio!');
            });

            voiceConnection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => 
            {
                console.log('Connection Disconnected!');
                voiceConnection.destroy();
                MusicQueue.VoiceConnection = null;
                exports.CurrentlyPlaying = false;
                // try {
                //     console.log('Connection Disconnected!');
                //     await Promise.race([
                //         entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
                //         entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
                //     ]);
                //     // Seems to be reconnecting to a new channel - ignore disconnect
                // } catch (error) {
                //     // Seems to be a real disconnect which SHOULDN'T be recovered from
                //     voiceConnection.destroy();
                //     MusicQueue.VoiceConnection = null;
                // }
            });
        }

        MusicQueue.VoiceConnection = voiceConnection;
    }
    catch(err)
    {
        console.error(err);
    }
}

exports.PlayNextSong = async () => 
{
    if(!MusicQueue.VoiceConnection)
    {
        exports.JoinVoice();
    }
    exports.CurrentlyPlaying = true;

    var song = MusicQueue.Songs[0];
    if(!song)
    {
        console.log(`Played entire queue.`);
        exports.CurrentlyPlaying = false;
        MusicQueue.VoiceConnection.destroy();
        MusicQueue.VoiceConnection = null;
        return;
    }
    song.TextChannel.send(`Now playing song: ${song.SongInfo.Title}`);
    const stream = ytdl(song.SongInfo.URL, { filter: 'audioonly' }, { seek: 0, volume: 1 });
    const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
    const player = createAudioPlayer();

    MusicQueue.VoiceConnection.subscribe(player);

    player.play(resource);

    player.on(AudioPlayerStatus.Playing, () => {
        console.log('Now playing audio.');
    });

    player.on(AudioPlayerStatus.Idle, () => {
        if (MusicQueue.Songs.length == 0) 
        {
            console.log(`Played entire queue, final song: ${song.SongInfo.Title}.`)
            exports.CurrentlyPlaying = false;
            MusicQueue.VoiceConnection.destroy();
        }
        else 
        {
            console.log(`Done playing song: ${song.SongInfo.Title}.`)
            MusicQueue.Songs.shift();
            exports.PlayNextSong();
        }
    });
}

exports.CurrentlyPlaying = false;

