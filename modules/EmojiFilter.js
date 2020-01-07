const Discord = require('discord.js');
const RichEmbed = Discord.RichEmbed;

const bannedEmojis = ['🍆', '🍌', '🥜', '💩', '🍑', '🌭'];

class EmojiFilter {
    constructor(client) {
        this.client = client;
    }

    async start() {
        //The events and the client.on('raw') is not my code. It is what handles throwing an event when someone sends a message or something
        const events = {
            MESSAGE_REACTION_ADD: 'messageReactionAdd',
            MESSAGE_REACTION_REMOVE: 'messageReactionRemove'
        };

        this.client.on('raw', async event => {
            if (!events.hasOwnProperty(event.t)) return;

            const { d: data } = event;
            const user = this.client.users.get(data.user_id);
            const channel =
                this.client.channels.get(data.channel_id) ||
                (await user.createDM());

            if (channel.messages.has(data.message_id)) return;

            const message = await channel.fetchMessage(data.message_id);
            const emojiKey = data.emoji.id
                ? `${data.emoji.name}:${data.emoji.id}`
                : data.emoji.name;
            let reaction = message.reactions.get(emojiKey);

            if (!reaction) {
                const emoji = new Discord.Emoji(
                    this.client.guilds.get(data.guild_id),
                    data.emoji
                );
                reaction = new Discord.MessageReaction(
                    message,
                    emoji,
                    1,
                    data.user_id === this.client.user.id
                );
            }

            this.client.emit(events[event.t], reaction, user);
        });

        //Checks if the reaction added is in the list of banned emojis and removed it if it is
        this.client.on('messageReactionAdd', reaction =>
            this.checkReaction(reaction)
        );

        //Dont do anything when a reaction is removed
        this.client.on('messageReactionRemove', (reaction, user) => {});
    }

    checkForMessage(messageObj) {
        console.log('running');
        bannedEmojis.forEach(emoji => {
            if (messageObj.content.includes(emoji)) {
                messageObj.delete(1000);
                messageObj.author.send(`Please do not use the ${emoji} emoji!`);
                this.notifyJacob(
                    new RichEmbed({
                        title: `${messageObj.author.username} sent a message with a banned emoji`,
                        description: `Emoji: ${emoji}\nChannel: ${messageObj.channel}\nMessage: ${messageObj}`,
                        color: 0x4e00ff
                    })
                );
            }
        });
    }

    async checkReaction(reaction) {
        if (bannedEmojis.includes(reaction.emoji.name)) {
            reaction.users.forEach(async user => {
                await reaction.remove(user);
                await user.send(
                    `Please do not react with the ${reaction.emoji} emoji`
                );

                //Dm's Jacob the name of the user, message they reacted to, and the emoji they used
                this.notifyJacob(
                    new RichEmbed({
                        title: `${user.username} reacted with a banned emoji`,
                        description: `Emoji: ${reaction.emoji}\nChannel: ${reaction.message.channel}\nMessage: ${reaction.message}`,
                        color: 0xffff
                    })
                );
            });
        }
    }

    notifyJacob(embed) {
        this.client.users.get('190179187863060480').send({ embed });
    }
}

module.exports = EmojiFilter;
