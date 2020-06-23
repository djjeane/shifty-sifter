exports.run = (client, message, args, level) => { 
    console.log("here")
    if (args.length == 0 || args.length == 1) return;
    if (args[1] == "null" || args[1] == "undefined" || args[1] == "NaN") {
        var timeInSeconds = 60;
    }
    else
    {
        var time = args[1];
        if (time > 5)
        {
            time = 5;
        }
        var timeInSeconds = time * 60;
        
    }
    var taggedUser = message.mentions.members.first();
    let mute_role = message.guild.roles.find("name","Shh")
    console.log(timeInSeconds)

    taggedUser.setMute(true)
        setTimeout(() => {
            taggedUser.setMute(false);
            }
        , timeInSeconds * 1000);

    taggedUser.addRole(mute_role)
    setTimeout(() => {
        taggedUser.removeRole(mute_role);
    }, timeInSeconds * 1000);
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
