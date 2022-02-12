var Events = require("../../models/Event.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("event")
    .setDescription("Schedules an event.")
    .addStringOption((option) =>
      option
        .setName("eventname")
        .setDescription("The name of the event.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("eventts")
        .setDescription(
          "The timestamp of the event: MM/DD/YYYY HH:MM:SS TZShort"
        )
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("remindmins")
        .setDescription(
          "The minutes before the event that users should be reminded"
        )
        .setRequired(true)
    ),
  async execute(interaction) {
    //Grab the needed paramaters from the argu from the message
    let nameOfEvent = interaction.options.getString("eventname");
    var timestampStr = interaction.options.getString("eventts");
    let remindMinutesBefore = interaction.options.getInteger("remindmins");

    //Get all the members that were mentioned, and if none were provided; stop here
    if (!interaction.message.mentions) {
      interaction.editReply(`You need to mention at least one user to notify.`);
      return;
    }

    let membersInvited = interaction.mentions.users.array() || new Array();
    if ((membersInvited.length = 0)) {
      message.reply("Please mention users after providing all arguments.");
      return;
    }

    //Build an array of the ids of the mentioned members, we need to store these ids in the database
    let userIdArray = [];
    membersInvited.forEach((element) => {
      userIdArray.push(element.id);
    });

    try {
      //Get the ts from the arguments and calculate the time that the bot should remind the attendies
      let tsOfEvent = new Date(Date.parse(timestampStr));
      let remindTime = new Date(
        tsOfEvent - remindMinutesBefore * 60000
      ).getTime();

      //Save the event to the database
      SaveEvent(
        nameOfEvent,
        timestampStr,
        remindTime,
        userIdArray,
        message.author.id
      );
    } catch (err) {
      message.reply(
        `Could not parse timestamp to date. Accepted format is MM/DD/YYYY HH:MM:SS TZShort.`
      );
      return;
    }

    message.reply(`Event: ${nameOfEvent} has been registered.`);
  },
};

//Saves the event to the Database
async function SaveEvent(
  nameOfEvent,
  eventStartTime,
  eventNotifyTime,
  users,
  author
) {
  try {
    var newEvent = Events({
      EventName: nameOfEvent,
      EventStartTime: eventStartTime,
      EventNotifyTime: eventNotifyTime,
      UsersToNotify: users,
      EventOrganizer: author,
    });
    newEvent.save(function (err) {
      if (err) throw err;
      console.info(`Event Saved`);
    });
  } catch (err) {
    console.error(`Error saving event: ${nameOfEvent} : ${err}`);
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User",
  pointRec: 0,
};

exports.help = {
  name: "event",
  category: "Miscellaneous",
  description:
    "Allows users to plan an event and remind other users of that event",
  usage:
    "event [Name of Event] [Time of Event] [Remind minutes before] [@mentions]",
};
