let index = require('../index.js')

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const channels = message.guild.channels.filter(c => c.type === 'voice');

    var valid = false
    var user = message.author;
    for (const [channelID, channel] of channels) {
        for (const [memberID, member] of channel.members) {
            if (memberID == user.id) {
                valid = true;
            }
        }

    }
    if (valid) 
    {
        message.channel.send('I have heard your message and will reply shortly my son.');
        const channels = message.guild.channels.filter(c => c.type === 'voice');
        //Loop through each voice channel and then every user in a channel
        for (const [channelID, channel] of channels) {
            for (const [memberID, member] of channel.members) {
                var game = member.user.presence.game;
                console.log(game)
                //ensure you dont move someone who isnt playing a game
                if (game != null) {
                    //check for a custom status
                    if (game.name != "Custom Status" && game.name != "Spotify") {
                        message.channel.send(`${member.user.tag} is playing ${game.name}`);
                        console.log(`games ${index.getGames()}`); //fails to see the correct array
                        console.log(`tempChannels ${index.getTempChannels()}`) //fails to see the correct array

                        //If you have already created the channel for the game
                        if(index.getGames() != undefined)
                        {
                            if (index.getGames().includes(game.name))
                            {
                                console.log(`found common game`)
                                var xyz = message.guild.channels.filter(c => c.type === "voice");
                                for (const [channelID, channel] of xyz)
                                {
                                    if (channel.name == game.name)
                                    {
                                        member.setVoiceChannel(channelID);
                                    }
                                }
                            }
                            else{
                                console.log('game not null but game not found')
                                if (channel.name != game.name) {
                                  var ch2 = await message.guild.createChannel(
                                    game.name,
                                    "voice"
                                  );
                                  console.log(ch2);
                                  var game = member.user.presence.game;
                                  index.addGame(game.name);
                                  index.addTempChannel({
                                    newID: ch2.id,
                                    guild: ch2.guild
                                  });
                                  await member.setVoiceChannel(ch2.id);
                                }
                            }
                        }
                        else
                        {
                            if (channel.name != game.name)
                            {

                                var ch2 = await message.guild.createChannel(game.name, 'voice')
                                var game = member.user.presence.game;
                                index.addGame(game.name);
                                index.addTempChannel(ch2.id);
  
                                await member.setVoiceChannel(ch2.id)
                            }
                        }
                    }

                }
            }
        }
    } 
    else 
    {
        message.channel.send('You must be in an active voice channel to use this command');
    }
    if(index.getGames() == null)
    {
        message.channel.send('No one is playing any games!!!!!! Dont waste my time man.');

    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User",
};

exports.help = {
    name: "sort",
    category: "Miscellaneous",
    description: "Take away all those loud pee sounds when the toilets are too close together.",
    usage: "sort"
};