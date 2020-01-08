import games from '../index';
import tempChannels from '../index';

module.exports = {
    name: 'clear',
    description: 'Clears all the temporary channels.',
    execute(msg, args) {
        msg.reply('Clearing all those channels we worked hard to summon into existence.');
        module.exports.deleteEmptyTempChannels();
    },
    deleteEmptyTempChannels: function (req, res, next) {
        if (tempChannels.length >= 0) {
            for (let i = 0; i < tempChannels.length; i++) {
                console.log(`List of Channels is ${tempChannels}`);
                console.log(`${i} out of ${tempChannels.length}`);
                let ch = tempChannels[i].guild.channels.find(x => x.id == tempChannels[i].newID);
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
    }
};