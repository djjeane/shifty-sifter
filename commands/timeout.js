exports.run = (client, message, args, level) => 
{ 
    
    if (args.length == 0 || args.length == 1) return;
    if (args[1] == "null" || args[1] == "undefined" || args[1] == "NaN") {
        var timeInSeconds = 60;
    }
    else
    {
        var timeInMins = args[1];
        if (timeInMins > 5)
        {
            timeInMins = 5;
        }
        var timeInSeconds = timeInMins * 60;
        
    }

    var taggedUser = message.mentions.members.first();
    taggedUser.setMute(true)
        setTimeout(() => {
            taggedUser.setMute(false);
            }
        , timeInSeconds * 1000);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Golden",
    pointRec: 0
};

exports.help = {
    name: "timeout",
    category: "Miscellaneous",
    description: "Server mutes a member for x minutes, no more than 5 minutes",
    usage: "timeout @user x"
};
