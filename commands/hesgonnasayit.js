
let index = require('../index.js');

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
    console.log('here')
    let taggedUser = message.mentions.users.first();
    if (message.author.id == '196100655692120064') return;
    if(taggedUser == null) // yeet
    {
        taggedUser = message.author;
        message.reply('Oh you think youre allowed to say it?');
    }
    console.log(index.getnWordCount())
    if (index.getnWordCount() == 0) 
    {
        index.setnWordUser(taggedUser);
        index.setnWordCount(1);
        message.channel.send(`Dont say it ${index.getnWordUser()}. Count: ${index.getnWordCount()}`);
        return;
    }
    if (index.getnWordCount() == 1) 
    {
        if (index.getnWordUser() == taggedUser)
        {
            index.setnWordCount(2);
            message.channel.send(`Dont say it ${index.getnWordUser()}. Count: ${index.getnWordCount()}`);
            return;
        } else 
        {
            index.setnWordCount(0);
            index.setnWordUser("");
            return;

        }
    }
    if (index.getnWordCount() == 2) 
    {
        if (index.getnWordUser() == taggedUser)
        {
            const member = message.guild.member(taggedUser);
            if (member) {

                member.kick({
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
            index.setnWordCount(0);
            index.setnWordUser("");
            return;
        }
        else 
        {
            index.setnWordCount(0);
            index.setnWordUser("");
        }

    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['marcoKillThisGuy','banthem'],
    permLevel: "Ceramic",
    pointRec: 0
};

exports.help = {
    name: "hesgonnasayit",
    category: "Ban",
    description: "Dont you dare let him say THAT word. 3 times if he said it",
    usage: "hesgonnasayit @user"
};