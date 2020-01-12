const fs = require("fs");
let points = JSON.parse(fs.readFileSync("./points.json", "utf8"));
let cooldowns = JSON.parse(fs.readFileSync("./pointsCooldowns.json", "utf8"));

exports.run = async(client, message, args, level) => { // eslint-disable-line no-unused-vars
    var canSpin = false;
    var day = 3600000;
    //At command check
    var today = Date.now();
    if (!cooldowns[message.author.id])
    {
        console.log(today)
        cooldowns[message.author.id] = {
            time: today + day,
            value : 1
        }
        canSpin = true;
    }
    else
    {
        console.log(`Now Time: ${today}`)
        if (cooldowns[message.author.id].time < today)
        {
            console.log(`${cooldowns[message.author.id].time} > ${today}`);
            delete cooldowns[message.author.id];
            canSpin = true;
        }
        else
        
        {
            var time = client.msToTime((cooldowns[message.author.id].time - today));
            // var x = Math.abs((cooldowns[message.author.id].time - today)) / 1000
            // var seconds = x % 60
            // x /= 60
            // var minutes = x % 60
            // x /= 60
            // var hours = x % 24

            // console.log(`${cooldowns[message.author.id].time} < ${today}`);
            message.channel.send(`You can spin again in ${time}`);
            canSpin = false;
        }
    }
    fs.writeFile("./pointsCooldowns.json", JSON.stringify(cooldowns), (err) => {
        if (err) console.error(err)
    });
    if(canSpin)
    {
        if (!points[message.author.id])
        {
            points[message.author.id] = {
                points: 0,
                level: 0
            };
        }
        let userData = points[message.author.id];
        var gainedPoints = Math.floor(Math.random() * (10 - 1) + 1);
        if(gainedPoints ==10 ||gainedPoints ==1)
        {
            message.reply(`You hit the jackpot motherfucker by rolling ${gainedPoints}`);
            var double = false;
            var temp = Math.floor(Math.random() * (10 - 1) + 1);
            if(temp ==1 && gainedPoints == 1)
            {
                userData.points = 0;
                userData.level = 0;
                message.reply(`You rolled 2 1's in a row. You lose all points and levels.`);
            }
            else if (temp == 10 && gainedPoints == 10)
            {
                userData.points = userData.points + gainedPoints + temp;
                var gained = userData.points * 2;
                userData.points = gained;
                message.reply(`You hit the motherfucking jackpot doubling your points to ${gained} bringing you to ${userData.points}`);  
            }
            else
            {
                userData.points = userData.points + gainedPoints + temp;
                message.reply(`You"ve got to roll twice! Gaining you **${gainedPoints}** and  bringing you to ${userData.points}`);
            }
        }
        else
        {
            userData.points = userData.points + gainedPoints;
            message.reply(`You"ve gained **${gainedPoints}** bringing you to ${userData.points}`);

        }

        let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
        if (curLevel > userData.level) {
            // Level up!
            userData.level = curLevel;
            message.reply(`You"ve leveled up to level **${curLevel}**! Ain"t that dandy?`);
        }

        fs.writeFile("./points.json", JSON.stringify(points), (err) => {
            if (err) console.error(err)
        });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['spin'],
    permLevel: "User"
};

exports.help = {
    name: "spinthewheel",
    category: "Miscellaneous",
    description: "Moves all the turds to the U bend.",
    usage: "spinthewheel",
};