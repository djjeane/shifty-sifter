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
    if (command === 'ping') {
        message.channel.send('Pong.');
    }
    if (command === 'sort') {
        message.channel.send('I have heard your message and will reply shortly my son.');
        sortMembers(message);
    }

});


client.login(token);

function sortMembers(message) {
    var games = [];
    const channels = message.guild.channels.filter(c =>  c.type === 'voice');
    for (const [channelID, channel] of channels) {
        for (const [memberID, member] of channel.members) {
            if(member.user.presence.game != null)
            {
                message.channel.send(member.user.presence.game);
                if(games.includes(member.user.presence.game)){
                    member.setVoiceChannel(member.user.presence.game);
                }
                else
                {
                    games.push(user.presence.game);
                    createVoiceChannel(member.user.presence.game, message);
                    member.user.setVoiceChannel(member.user.presence.game);
                }
            }
            message.channel.send(`${member.user.tag} is playing ${member.user.presence.game}`)
                .then(() => console.log(`Moved ${member.user.tag}.`))
                .catch(console.error);
            
        }
    }

function createVoiceChannel(game,message)
{
    message.guild.createChannel(game,'voice')

}
    //const onlineMembers = client.users;
    //var games = [];
    //console.log(client.users);
    //message.channel.send('SORTING UNTIL DEATH.')
    //var onlineMembers = client.users.filter((key,member) => client.users[member].voiceChannel != "null");
    //console.log(onlineMembers);
    //onlineMembers.forEach((member, key) => message.channel.send(`user: ${member.username} is in ${member.voice.voice_channel }`));
    //for(var user in onlineMembers){
       // message.channel.send(`user: ${user}`);
        //if(user.voiceChannel != null){
            //message.channel.send(user.username);
        //}
    //}
    //onlineMembers.forEach(user => {
        //console.log(user.)
        //if (user.voiceChannel != null) {
            //var channelName = user.voiceChannel;
            //message.channel.send(`User: ${user.username} is in Voice Channel: ${channelName}`);
        //}
//});
}

