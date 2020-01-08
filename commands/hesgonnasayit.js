import nWordCount from '../index';
import nWordUser from '../index';


module.exports = {
    name: 'pong',
    description: 'Pong!',
    execute(message, args) {
        let adminRole = message.guild.roles.find("name", "Ceramic");
        console.log(adminRole);
        console.log(message.member.roles);
        if (!message.member.roles.has(adminRole.id))
        {
            message.reply(`NWord NWord NWord`);

            return;
        }
        const taggedUser = message.mentions.users.first();
        if (nWordCount == 0) 
        {
            nWordUser = taggedUser;
            message.channel.send(`Dont say it ${nWordUser}`);
            nWordCount = nWordCount + 1;
            return;
        }
        if (nWordCount == 1) 
        {
            if (nWordUser == taggedUser) 
            {
                message.channel.send(`Dont say it ${nWordUser}`);
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
    }
};