var Events = require('../models/Event.js');

exports.run = (client, message, args, level) => 
{
    if(args.length < 5)
    {
        message.reply(`Not enought arguments proveded, please refer to the help file.`);
        return;
    }
    //Grab the needed paramaters from the argu from the message
	let nameOfEvent = args[0];
    let dateOfEvent = args[1];
    let timeOfEvent = args[2];
    let tzOfEvent = args[3];
    let remindMinutesBefore = args[4];

    //if any of the provided args are not present, stop here
    if(!nameOfEvent || !dateOfEvent || !timeOfEvent || !tzOfEvent || !remindMinutesBefore)
    {
        message.reply(`Event could not be registered. Please reference the help file!`);
        return;
    }

    //Get all the members that were mentioned, and if none were provided; stop here
    let membersInvited = message.mentions.users.array() || new Array();
    if(membersInvited.length = 0)
    {
        message.reply('Please mention users after providing all arguments.');
        return;
    }

    //Build an array of the ids of the mentioned members, we need to store these ids in the database
    let userIdArray = [];
    membersInvited.forEach(element => {
        userIdArray.push(element.id);
    });


    var timestampStr = `${dateOfEvent} ${timeOfEvent} ${tzOfEvent}`
    try{
        //Get the ts from the arguments and calculate the time that the bot should remind the attendies
        let tsOfEvent = new Date(Date.parse(timestampStr));
        let remindTime = new Date(tsOfEvent - remindMinutesBefore * 60000).getTime();

        //Save the event to the database
        SaveEvent(nameOfEvent,timestampStr,remindTime,userIdArray,message.author.id)
    }
    catch(err)
    {
        message.reply(`Could not parse timestamp to date. Accepted format is MM/DD/YYYY HH:MM:SS TZShort.`);
        return;
    }

    message.reply(`Event: ${nameOfEvent} has been registered.`);

};

//Saves the event to the Database
async function SaveEvent(nameOfEvent,eventStartTime,eventNotifyTime,users,author)
{
    try
    {
        var newEvent = Events({
            EventName: nameOfEvent,
            EventStartTime: eventStartTime,
            EventNotifyTime: eventNotifyTime,
            UsersToNotify: users,
            EventOrganizer: author
        });
        newEvent.save(function(err){
            if(err) throw err;
            console.info(`Event Saved`);
        });
    }
    catch(err)
    {
        console.error(`Error saving event: ${nameOfEvent} : ${err}`);
    }
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User",
	pointRec: 0
};

exports.help = {
	name: "event",
	category: "Miscellaneous",
	description: "Allows users to plan an event and remind other users of that event",
	usage: "event [Name of Event] [Time of Event] [Remind minutes before] [@mentions]"
};