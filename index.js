const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
//const { EmojiFilter, UserHelpers } = require('./modules/index.js');
//const emojiFilter = new EmojiFilter(client);
//const notify = require('./modules/notify.js');

client.once('ready', () => {
    console.log('Ready!');
    //emojiFilter.start();
});

client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'ping') {
        message.channel.send('Pong.');
    }
    if (command === 'pong') {
        message.channel.send('Ping.');
    }
    if (command === 'sort') {
        message.channel.send('I have heard your message and will reply shortly my son.');
        sortMembers(message);
    }

});


client.login(token);

function sortMembers(message) 
{
    var games = [];
    const channels = message.guild.channels.filter(c =>  c.type === 'voice');
    for (const [channelID, channel] of channels) 
    {
        for (const [memberID, member] of channel.members) 
        {
            //if(member.user.presence.game != null)
            //{
            message.channel.send(`${member.user.tag} is playing ${member.user.presence.game}`)
            .then(() => console.log(`Moved ${member.user.tag}.`))
            .catch(console.error);
            
            if(games.includes(member.user.presence.game))
            {
                console.log('if');
                member.user.setVoiceChannel(member.user.presence.game);
            }
            else
            {
                console.log('else');
                games.push(member.user.presence.game);
                console.log(games);
                var chID = createVoiceChannel(member.user.presence.game, message);
                member.setVoiceChannel(chID).catch(console.error);
            }
           // }

            
        }
    }
}

function createVoiceChannel(game,message)
{
    message.guild.createChannel(game.name,'voice');
    const channels = message.guild.channels.filter(c =>  c.type === 'voice');
    for (const [channelID, channel] of channels) 
    {
        if(channel.name == game.name){
            return channelID;
        }
    }
}



