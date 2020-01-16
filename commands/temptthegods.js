exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    var KeepPlaying = true;
    var member = message.author;
    var max = 20;
    if(args.length != 0)
    {
        message.reply('You must first tempt the gods yourself.');
        return;
    } 
    while(KeepPlaying){

   
        var killNumber = Math.floor(Math.random() * (max - 1) + 1);
        if(killNumber == 1)
        {
            var banMessage= "";
            if (member.tag != undefined) {
                banMessage = `You have been banned ${member} you knew the risks. Fucking idiot.`
            } else {
                banMessage = `You have been banned ${member.user} you knew the risks. Fucking idiot.`
            }
            message.channel.send()
            member.kick({
                reason: 'They played the game and lost.',
            }).then(() => {
                message.channel.send(banMessage);
            }).catch(err => {
                message.reply('I was unable to ban the member');
                // Log the error
                console.error(err);
            });
            KeepPlaying = false;
        }
        else
        {
            message.channel.send(`Kill number this round: ${killNumber}`)
            var resMess ="";
            if(member.tag != undefined)
            {
                resMess = `Odds of ban: 1/${max}. You won this time ${member} , challenge a friends honor. Usage: ${client.user.tag} !temptthegods @user`
            }
            else
            {
                resMess = `Odds of ban: 1/${max}. You won this time ${member.user} , challenge a friends honor. Usage: ${client.user.tag} !temptthegods @user`
            }
            const response = await client.awaitReply(message, resMess,member.id);
            if(response != null)
            {
                console.log(response)
                if(response!= false)
                {    var resArray = response.split(" ");
                    if(resArray[1] == '!temptthegods')
                    {
                        var taggedUser = resArray[2];
                        taggedUser = taggedUser.replace(/\D/g, '');
                        console.log(taggedUser)
                        member = message.guild.members.find(c => c.id == taggedUser);
                        console.log(member)
                        max = max - 1;
                    }
                    else{
                        KeepPlaying = false;

                    }
                }
                else
                {
                    KeepPlaying = false;
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
    aliases: ['tempt','ihatethissever','letmedie'],
    permLevel: "User",
    pointRec: 0
};

exports.help = {
    name: "temptthegods",
    category: "I am dumb if i use this",
    description: "Test Your Luck",
    usage: "temptthegods"
};