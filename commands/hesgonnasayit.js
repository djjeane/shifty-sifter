
let nWordCount = require('../index.js').nWordCount;
let nWordUser = require('../index.js').nWordUser;

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars

    const taggedUser = message.mentions.users.first();
    if (message.author.id == '196100655692120064') return;
    console.log(nWordCount)
    if (nWordCount == 0) 
    {
        nWordUser = taggedUser;
        message.channel.send(`Dont say it ${nWordUser}: Count-${nwordCount}`);
        nWordCount = nWordCount + 1;
        return;
    }
    if (nWordCount == 1) 
    {
        if (nWordUser == taggedUser) 
        {
            message.channel.send(`Dont say it ${nWordUser}: Count-${nwordCount}`);
            nWordCount = nWordCount + 1;
            return;
        } else 
        {
            nWordCount = 0;
            nWordUser = "";

        }
    }
    if (nWordCount == 2) 
    {
        if (nWordUser == taggedUser) 
        {
            const member = message.guild.member(taggedUser);
            if (member) {

                member.ban({
                    reason: 'You said it!',
                }).then(() => {
                    message.reply(`Successfully banned ${user.tag}`);
                }).catch(err => {

                    message.reply('I was unable to ban the member');
                    // Log the error
                    console.error(err);
                });
            } else {
                message.reply('That user isn\'t in this guild!');
            }
            message.channel.send(`${nWordUser} shouldnt have said it.`);
            nWordCount = 0;
            nWordUser = "";
            return;
        }
        else 
        {
            nWordCount = 0;
            nWordUser = "";
        }

    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['marcoKillThisGuy'],
    permLevel: "Ceramic",
};

exports.help = {
    name: "hesgonnasayit",
    category: "Ban",
    description: "Dont you dare let him say THAT word. 3 times if he said it",
    usage: "hesgonnasayit @user"
};