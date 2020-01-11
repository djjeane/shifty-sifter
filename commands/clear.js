
let games = require('../index.js').games;
let tempChannels = require('../index.js').tempChannels;
exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
    if (tempChannels.length >= 0) {
        for (let i = 0; i < tempChannels.length; i++) {
            console.log(`List of Channels is ${tempChannels}`);
            console.log(`${i} out of ${tempChannels.length}`);
            console.log(`Current Channel: ${tempChannels[i]}`);
            let ch = message.guild.channels.find(x => x.id == tempChannels[i].newID);
            console.log(`Current Channel is ${ch}`);
            // Channel Found!
            if (ch != null) {
                if (ch.members.size <= 0) {
                    var gameName = ch.name;
                    for (var j = 0; j < games.length; j++) {
                        if (games[j] === gameName) {
                            games.splice(j, 1);
                            console.log(`${gameName} was removed from the list.`)
                            console.log(games);
                        }
                    }
                    ch.delete();
                    // Channel has been deleted!

                    tempChannels.splice(i, 1);
                    i = i - 1;
                    tempChannels.length = tempChannels.length;
                } else {
                    console.log('Channel still has members');
                }
            } else {
                console.log('Channel was null');
            }
        }
    }
    
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "clear",
    category: "Sort Misc",
    description: "Deletes all the empty channels created from the sort command.",
    usage: "clear"
};