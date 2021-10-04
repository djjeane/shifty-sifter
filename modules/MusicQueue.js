let Queue = class
{
	Songs = [];
	VoiceConnection;
    Guild;
	constructor(connection,guild)
	{
		this.VoiceConnection = connection;
        this.Guild = guild;
	}
    
    AddSong = async (song,guild) => 
    {
        exports.MusicQueue.Songs.push(song);
        exports.MusicQueue.Guild = guild;
    }

    NextSong = async() =>
    {
        exports.MusicQueue.Songs.shift();
    }
}

let SongInfo = class
{
	constructor(url,title)
	{
		this.URL = url;
		this.Title = title;
	}
}

exports.Song = class
{
	TextChannel;
	SongInfo;
	VoiceChannel;

	constructor(vc,tc,url,title)
	{
		this.TextChannel = tc;
		this.SongInfo = new SongInfo(url,title);
		this.VoiceChannel = vc;
	}
}

exports.MusicQueue = new Queue();