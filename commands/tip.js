const fs = require("fs");
let points = JSON.parse(fs.readFileSync("./points.json", "utf8"));

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

    console.log(args)
    if (!points[message.author.id])
    {
        message.reply('You must first gain points before you send them');
        return;
    }
    var tippingUserData = points[message.author.id];
    var taggedUser = message.mentions.users.first();
    var amountToTip = parseInt(args[1],10);
    if (!points[taggedUser.id])
    {
        points[taggedUser.id] = {
            points: 0,
            level: 0
        };
    }
    var taggedUserData = points[taggedUser.id];

    if (tippingUserData.points - amountToTip < 0 )
    {
        amountToTip = tippingUserData.points;
    }
    if(amountToTip <=0)
    {
        message.reply('You cannot tip 0 points.');
        return;
    }
    tippingUserData.points = tippingUserData.points - amountToTip;
    taggedUserData.points = taggedUserData.points + amountToTip;

    //set the new levels
    let curLevel = Math.floor(0.1 * Math.sqrt(tippingUserData.points));
    if (curLevel < tippingUserData.level) {
            // Level up!
            tippingUserData.level = curLevel;
            message.reply(`You"ve lost a level, you are now at level: ${curLevel}! :(`);
        }

    let curLevel2 = Math.floor(0.1 * Math.sqrt(taggedUserData.points));
    if (curLevel2 < taggedUserData.level) {
        // Level up!
        taggedUserData.level = curLevel;
        message.channel.send(`${taggedUser} You"ve leveled up to level **${curLevel}**! Ain"t that dandy?`);
    }

    message.channel.send(`${message.author} has given ${taggedUser} ${amountToTip} points! Say Thanks.`)
    message.reply(`You now have ${tippingUserData.points} points!`)
    message.channel.send(`${taggedUser} you now have ${tippingUserData.points} points!`)
    // if (gainedPoints == 10 || gainedPoints == 1) {
    //     message.reply(`You hit the jackpot motherfucker by rolling ${gainedPoints}`);
    //     var double = false;
    //     var temp = Math.floor(Math.random() * (10 - 1) + 1);
    //     if (temp == 1 && gainedPoints == 1) {
    //         userData.points = 0;
    //         userData.level = 0;
    //         message.reply(`You rolled 2 1's in a row. You lose all points and levels.`);
    //     } else if (temp == 10 && gainedPoints == 10) {
    //         userData.points = userData.points + gainedPoints + temp;
    //         var gained = userData.points * 2;
    //         userData.points = gained;
    //         message.reply(`You hit the motherfucking jackpot doubling your points to ${gained} bringing you to ${userData.points}`);
    //     } else {
    //         userData.points = userData.points + gainedPoints + temp;
    //         message.reply(`You"ve got to roll twice! Gaining you **${gainedPoints}** and  bringing you to ${userData.points}`);
    //     }
    // } else {
    //     userData.points = userData.points + gainedPoints;
    //     message.reply(`You"ve gained **${gainedPoints}** bringing you to ${userData.points}`);

    // }

    // let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
    // if (curLevel > userData.level) {
    //     // Level up!
    //     userData.level = curLevel;
    //     message.reply(`You"ve leveled up to level **${curLevel}**! Ain"t that dandy?`);
    // }

    fs.writeFile("./points.json", JSON.stringify(points), (err) => {
        if (err) console.error(err)
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['spin'],
    permLevel: "User"
};

exports.help = {
    name: "tip",
    category: "Miscellaneous",
    description: "Gives this guy some amount of your points.",
    usage: "tip @user x",
};