let index = require('../index.js');
const Discord = require('discord.js');
let moment = require('moment');
exports.run = async (client, message, args, level) => {
    var passedTZ = args.pop();
    var dateStr = args.join(' ');

    console.log(dateStr);
    try
    {
        var momDate = moment.tz(dateStr,passedTZ);
    }
    catch (err) {
        console.log(err);
    }
    //var tzs = [
        //'America/New_York',
        //'America/Chicago',
        //'America/Denver',
        //'America/Los_Angeles',
    //]
    var tzs = [
        'EST',
        'EDT',
        'PST',
        'PDT',
    ];
    if(momDate.isValid())
    {
        tzs.forEach(timeZone =>
            {
                if(!momDate.format('z') == timeZone)
                {
                    message.channel.send(`${timeZone} : ${momDate.tz(timeZone).format('ha z')}`);
                }
                else
                {
                    console.log(momDate.format('z'))
                }
            });
    }
    else
    {
        message.channel.send("This is a bad Date/Time")
    }

};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['C'],
    permLevel: "User",
    pointRec: 0
};

exports.help = {
    name: "convert",
    category: "Miscellaneous",
    description: "Converts time to all other US timezones",
    usage: "convert datetime"
};