const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
const { EmojiFilter, UserHelpers } = require('./modules/index.js');
const emojiFilter = new EmojiFilter(client);
const notify = require('./modules/notify.js');

client.once('ready', () => {
    console.log('Ready!');
    emojiFilter.start();
});

client.on('message', message => {
    if (message.author.bot) return; //Excludes the bot from reading its own messages

    if(message.content == `${prefix}sort`)
    {
        if (!message.content.startsWith(prefix) || message.author.bot) return;


        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
        if (command === 'ping') {
            message.channel.send('Pong.');
        if (command === 'ping') {
            message.channel.send('Pong.');
        if (command === 'sort') {
            message.channel.send('I have heard your message and will reply shortly my son.');
            sortMembers();
    }
});
    //emojiFilter.checkForMessage(message);

    //Sets the users nickname if they type !name First Last
    //if (message.content.startsWith(`${prefix}name`)) {
       // const helper = new UserHelpers(client);
        //helper.setNickName(message);
    //} else if (message.content.startsWith(`${prefix}poke`)) {
       // message.author.send('Poke!');
    //}


//When a member joins the server add the default role and send the admins an embed telling them to assign the user the correct role
client.on('guildMemberAdd', member => {
    const role = member.guild.roles.find(role => role.name === 'verified');
    member.addRole(role).then(member => {
        notify.notifyAdmins(member);
        //Prompts the user to set their nickname
        getUserNickName(member);
    });
});


client.login(token);

function sortMembers(){
    const onlineMembers = guild.members;
    //var games = [];

    onlineMembers.forEach(user => {
        if (user.voiceChannel != null) {
            var channelName = user.voiceChannel
            
            message.author.send(`User: ${user.username} is in Voice Channel: ${channelName}`);
        }
    });
}

