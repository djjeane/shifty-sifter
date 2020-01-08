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

//Handles messages and commands 
client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    console.log(`Command: ${command}`)
    console.log(`args: ${args}`)
   
    if (command === 'ping') {
        message.channel.send('Pong.');
    }
    if (command === 'pong') {
        message.channel.send('Ping.');
    }
    if (command === 'sort') {
        message.channel.send('I have heard your message and will reply shortly my son.');
        if(validateCommand(message))
        {
            sortMembers(message);
        }
        else
        {
            message.channel.send('You must be in an active voice channel to use this command');
        }
    }
    if (command === 'clear') 
    {
        message.channel.send('I am working to fix your problem.');
        console.log(tempChannels);
        deleteEmptyTempChannels();
    }
    if (command === 'flush') 
    {
        message.channel.send('Thanks you for flushing, and for your humble offering');
        flush(message);
    }
    if (command === 'splitusup') 
    {
        message.channel.send('A civil war... nice!');
        split(message);
    }if(command === 'plzdawson')
    {
        message.author.send('No Bitch.');
        message.channel.send('I have answered the call.');
    }

});

client.on('messageUpdate', (oldMessage, newMessage) => {
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
         if (validateCommand(message)) {
             sortMembers(message);
         } else {
             message.channel.send('You must be in an active voice channel to use this command');
         }
     }
     if (command === 'clear') {
         message.channel.send('I am working to fix your problem.');
         console.log(tempChannels);
         deleteEmptyTempChannels();
     }
     if (command === 'flush') {
         message.channel.send('Thanks you for flushing, and for your humble offering');
         flush(message);
     }
     if (command === 'splitusup') {
         message.channel.send('A civil war... nice!');
         split(message);

     }
});

function split(message)
{

}
//Moves everyone in a voice channel to the clogged channel

//BUG - doesn't work at all - refer to logs for details
function flush(message)
{
    const authorID = message.guild.author.voiceChannel;

    console.log(authorID);
    console.log(`Flushed by ${message.author}`)

    for (const [channelID, channel] of channels)
    {
        for (const [memberID, member] of channel.members) 
        {
            if(message.author.voiceChannel == channelID)
            {
                if (memberID != message.author.id) 
                {
                    member.setVoiceChannel(message.guild.afkChannelID);
                }
            }
        }
    } 
}

//Deletes the temporary channels which we created by the sort method
//BUG - only deletes one channel per run, not the entire list of empty channels
function deleteEmptyTempChannels()
{
    if(tempChannels.length >= 0) 
    {
        for(let i = 0; i < tempChannels.length; i++)
        {
            console.log(`List of Channels is ${tempChannels}`);
            console.log(`${i} out of ${tempChannels.length}`);
            let ch = tempChannels[i].guild.channels.find(x => x.id == tempChannels[i].newID);
            console.log(`Current Channel is ${ch}`);
            // Channel Found!
            if(ch != null){
                if(ch.members.size <= 0)
                {
                    var gameName = ch.name;
                    for( var j = 0; j < games.length; j++){ 
                        if ( games[j] === gameName) 
                        {
                            games.splice(j, 1); 
                            console.log(`${gameName} was removed from the list.`)
                            console.log(games);
                        }
                    }
                    ch.delete();
                    // Channel has been deleted!
                    
                    tempChannels.splice(i, 1);
                    i = i-1;
                    tempChannels.length = tempChannels.length;
                } 
                else
                {
                    console.log('Channel still has members');
                } 
            }   
            else
            {
                console.log('Channel was null');
            }  
        }    
    }
}

client.login(token);


//If the user is in a voice channel, then the command is valid
        //ToDo - Restrict by roles which can be set via a config file
function validateCommand(message)
{
    const channels = message.guild.channels.filter(c =>  c.type === 'voice');

    var valid = false
    var user = message.author;
    for (const [channelID, channel] of channels) 
    {
        for (const [memberID, member] of channel.members) 
        {
            if(memberID == user.id){
                valid = true;
            }
        }

    }
    return valid;
    

}

//Sorts members into different voice channels based on what game they are playing
function sortMembers(message) 
{
    const channels = message.guild.channels.filter(c =>  c.type === 'voice');
    //Loop through each voice channel and then every user in a channel
    for (const [channelID, channel] of channels) 
    {
        for (const [memberID, member] of channel.members) 
        {
            var game = member.user.presence.game;
            //ensure you dont move someone who isnt playing a game
            if( game != null )
            {
                //check for a custom status
                if (game.name != "Custom Status" && game.name != "Spotify")
                {
                    message.channel.send(`${member.user.tag} is playing ${game.name}`)
                    .then(() => console.log(`Moved ${member.user.tag}.`))
                    .catch(console.error);
                    
                    //If you have already created the channel for the game
                    if(games.includes(game.name))
                    {
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
                        if(channel.name != game.name)
                        {
                            //make sure a channel doesnt already exist
                            for (const [channelID, channel] of channels) 
                            {
                                console.log(channel.name);
                                if(channel.name == game.name)
                                {
                                    member.setVoiceChannel(channelID);
                                    return;
                                }
                            }
                            //if the channel doesnt exist create one, log the game and log the temp channel
                            message.guild.createChannel(game.name, 'voice')
                                .then(async channel => {
                                    var game = member.user.presence.game;
                                    games.push(game.name);
                                    tempChannels.push({ newID: channel.id, guild: channel.guild })
                                    await member.setVoiceChannel(channel.id)
                                });
                        }

                    }
                }
                
            }     
        }
    }
}


