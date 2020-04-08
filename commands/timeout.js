exports.run = (client, message, args, level) => { 
      
    var taggedUser = message.mentions.users.first();
    let mute_role = message.guild.roles.find("name","Shh")
    taggedUser.addRole(mute_role)
    setTimeout(() => {taggedUser.removeRole(mute_role); }, 60 * 1000);
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Ceramic",
    pointRec: 0
};

exports.help = {
    name: "timeout",
    category: "Miscellaneous",
    description: "Server mutes a member for x minutes",
    usage: "timeout @user x"
};
