// const fs = require("fs");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    // let points = JSON.parse(fs.readFileSync("./points.json", "utf8"));
    console.log(args)
    // var tippingUserP = await client.GetPoints(message.author.id);
    // var tippedUserP = await client.GetPoints(taggedUserID);
    if(args.length == 0) return;
    if (args[1] == "null" || args[1] == "undefined" || args[1] == "NaN")
    {
        return;
    }
    var taggedUser = message.mentions.users.first();
    var taggedUserID = message.mentions.users.first().id;

    var tippingUserP = await client.GetPoints(message.author.id);
    var tippedUserP = await client.GetPoints(taggedUserID);
    if(taggedUserID == message.author.id){
        message.reply(`You cant give yourself points. You think your shit dont stink huh? -5 points.`)
        await client.UpdatePoints(message.author.id, -1 * 5);
        return;
    }
    var amountToTip = Math.abs(parseInt(args[1]));
    
    console.log(typeof amountToTip)
    console.log(amountToTip)
    if (typeof amountToTip != 'number')
    {
        message.reply('You can only tip integer values.')
        return;
    }
    var tippingUserPoints = await client.GetPoints(message.author.id);


    if (tippingUserPoints - amountToTip < 0)
    {
        message.reply(`You only have ${tippingUserPoints} points. You cannot give ${amountToTip} points.`)
        return;
    }

    await client.UpdatePoints(message.author.id, -1 * amountToTip);

    await client.UpdatePoints(taggedUserID, amountToTip);



    message.channel.send(`${message.author} has given ${taggedUser} ${amountToTip} points! Say Thanks.`)
    message.reply(`You now have ${tippingUserP - amountToTip} points!`)
    message.channel.send(`${taggedUser} you now have ${tippedUserP + amountToTip}  points!`)
    
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['give'],
    permLevel: "User"
};

exports.help = {
    name: "tip",
    category: "Points",
    description: "Gives this guy some amount of your points.",
    usage: "tip @user x",
};