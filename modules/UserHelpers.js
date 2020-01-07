const Discord = require('discord.js');
const RichEmbed = Discord.RichEmbed;
const notify = require('./notify.js');

class UserHelpers {
    constructor(client) {
        this.client = client;
        console.log('New User Ready');
    }

    async setNickName(message) {
        console.log('Im here');
        const name = message.content
            .split(' ')
            .slice(1)
            .join(' ');
        this.client.guilds
            .get('614174577928568896')
            .members.get(message.author.id)
            .setNickname(name)
            .then(guildMember => {
                guildMember.send(`Your nickname has been changed to ${name}!`);
            })
            .catch(e => {
                notify.notifyJacob(
                    new RichEmbed({
                        title: `An error occurred when setting nickname`,
                        description: `${e}\nChannel: ${message.channel}\nMessage: ${message}`,
                        color: 0xff0000
                    })
                );
            });
    }
}

module.exports = UserHelpers;
