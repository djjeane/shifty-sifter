const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
//const { EmojiFilter, UserHelpers } = require('./modules/index.js');
//const emojiFilter = new EmojiFilter(client);
//const notify = require('./modules/notify.js');
var tempChannels = [];
var games = [];
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
client.on('voiceStateUpdate', (oldMember, newMember) =>
{
    if(tempChannels.length >= 0) for(let i = 0; i < tempChannels.length; i++) 
    {
        // Finding...
        console.log(tempChannels);
        let ch = tempChannels[i].guild.channels.find(x => x.id == tempChannels[i].newID);
        
        // Channel Found!
        if(ch != null){
            if(ch.members.size <= 0)
            {
                var gameName = ch.name;
                for( var j = 0; j < games.length; j++){ 
                    if ( games[j] === gameName) {
                        games.splice(j, 1); 
                      console.log(`${gameName} was removed from the list.`)
                      console.log(games);
                    }
                 }
                ch.delete();
                // Channel has been deleted!
                
                return tempChannels.splice(i, 1);
            }  
        }   
        else{
            console.log('Channel was null');
        }      
        
    }

});

client.login(token);
function sortMembers(message) 
{
    const channels = message.guild.channels.filter(c =>  c.type === 'voice');
    for (const [channelID, channel] of channels) 
    {
        for (const [memberID, member] of channel.members) 
        {
            var game = member.user.presence.game;
            message.channel.send(`${member.user.tag} is playing ${game.name}`)
            .then(() => console.log(`Moved ${member.user.tag}.`))
            .catch(console.error);
            
            if(games.includes(game.name))
            {
                console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
                for (const [channelID, channel] of channels) 
                {
                    if(channel.name == game.name)
                    {
                        member.setVoiceChannel(channelID);
                    }
                }
            }
            else
            {
                console.log('else');
                games.push(game.name);
                console.log(games);
                var chID = createVoiceChannel(game.name, message);
                console.log(chID);
                tempChannels.push({ newID: chID, guild: channel.guild })
                member.setVoiceChannel(chID);
            }


            
        }
    }
}

function createVoiceChannel(gameName,message)
{
    var ch = message.guild.createChannel(gameName,'voice');
    return ch.id;
    //const channels = message.guild.channels.filter(c =>  c.type === 'voice');
   // for (const [channelID, channel] of channels) 
  //  {
        //if(channel.name == gameName){
          //  return channelID;
        //}
    //}
}



