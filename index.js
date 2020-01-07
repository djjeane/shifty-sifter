const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
//const { EmojiFilter, UserHelpers } = require('./modules/index.js');
//const emojiFilter = new EmojiFilter(client);
const notify = require('./modules/notify.js');

client.once('ready', () => {
    console.log('Ready!');
    //emojiFilter.start();
});

client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;
    message.channel.send(message.content);

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

    const onlineMembers = client.server.members;
    //var games = [];
    message.channel.send('SORTING UNTIL DEATH.')
    onlineMembers.forEach(user => {
        if (user.voiceChannel != null) {
            var channelName = user.voiceChannel;
            message.channel.send(`User: ${user.username} is in Voice Channel: ${channelName}`);
        }
    });
}

