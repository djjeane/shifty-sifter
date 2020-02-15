let loadedSounds = require('../index.js').loadedSounds
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    //  client.playSound = async (authorChannel,authorViceChannel,command,sound) =>{
    if(args.length !=0)
    {
        var authorChannel = message.channel;
        var authorVoiceChannel = message.member.voiceChannel;

        if(!loadedSounds.includes(args[0]))
        {
            message.reply(`This is not a valid sound. Valid sounds are ${loadedSounds}`)
            return;
        }
        var sound = args[0];
        sound = sound.concat('.mp3');
        var soundPath = "../sounds/" + sound;
        console.log(soundPath)
        authorVoiceChannel.join().then( async function (connection, joinError) {
            if (joinError) {
                var joinErrorMessage = 'Error joining voice channel: ';
                console.log(joinErrorMessage, joinError);
                bot.sendMessage(authorChannel, joinErrorMessage + joinError);
            }
            const dispatcher = await connection.playFile(
              require("path").join(__dirname, soundPath)
            );
            dispatcher.on("start", () => {
              //not working
              dispatcher.setVolume(0.7);
              console.log("Playing");
            });

            dispatcher.on("error", err => console.log(err)); //no errors

            dispatcher.on("end", end => {
              //working fine
              console.log("Finished");
              console.log("End: " + end);
              message.member.voiceChannel.leave();
            });
            
        });
    }
    else
    {
      message.reply(`You must denote a sound. Options {dylan , airhorn, liar, iridocyclitis, tacos, arf, hush, whatdoilikedoing, driveby}`)
        return;
    }

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User",
    pointRec: 15
};

exports.help = {
  name: "play",
  category: "Sounds",
  description: `It plays the passed sound. Options: {dylan, airhorn, liar, iridocyclitis, tacos, arf, hush, whatdoilikedoing, driveby}`,
  usage: "play"
};
