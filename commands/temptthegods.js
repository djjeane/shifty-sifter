exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    var KeepPlaying = true;
    var member = message.author;
    console.log(args)
    if(args.length != 0)
    {
        message.reply('You must first tempt the gods yourself.');
        return;
    } 
    while(KeepPlaying){

   
        var killNumber = Math.random() * (10 - 1) + 1;
        if(killNumber == 5)
        {
            message.channel.send('this would have banned')
            // member.ban({
            //     reason: 'You knew the risks!',
            // }).then(() => {
            //     message.reply(`You have tempted the gods ${user.tag} and you will be punished.`);
            // }).catch(err => {
            //     message.reply('I was unable to ban the member');
            //     // Log the error
            //     console.error(err);
            // });
        }
        else
        {
            
            const response = await client.awaitReply(message, `You won this time ${member.tag} , challenge a friends honor. Usage: !temptthegods @user`);
            if(response != null)
            {
                console.log(response)
                var resArray = response.split(" ");
                if(resArray[0] == '!temptthegods')
                {
                    var taggedUser = resArray[1];
                    taggedUser = taggedUser.replace(/\D/g, '');
                    console.log(taggedUser)
                    member = message.guild.members.find(c => c.id == taggedUser);
                    member = taggedUser;
                }

            }
            else
            {
                KeepPlaying = false;

            }


        }
    }
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['isjackdumbdumb'],
    permLevel: "User"
};

exports.help = {
    name: "temptthegods",
    category: "I am dumb if i use this",
    description: "Test Your Luck",
    usage: "temptthegods"
};