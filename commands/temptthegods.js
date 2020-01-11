exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    var KeepPlaying = true;
    var member = message.guild.member(message.author.id);

    while(KeepPlaying){

   
        var killNumber = Math.random() * (10 - 1) + 1;
        if(killNumber == 5)
        {
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
            const response = await client.awaitReply(msg, "You won this time, challenge a friends honor. Usage: !temptthegods @user");
            if(response != null)
            {
                console.log(response)
                KeepPlaying = false;
            }
            else
            {
                message.channel.send("Thanks for playing anyway.")
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