// This will check if the node version you are running is the required
// Node version, if it isn't it will throw the following error to inform
// you.
if (Number(process.version.slice(1).split(".")[0]) < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

const Discord = require("discord.js");
const { Client,Collection, Intents } = require('discord.js');
const fs = require('fs');
const {promisify} = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const env = require('dotenv').config();
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

var nWordCount = 0;
var tempChannels = [];
var games = [];
var nWordUser = "";
var spunRecently = {};
var flushedChannel = "";
let dickPics = [];


module.exports.getFlushedChannel = function () {
    return flushedChannel;
}
module.exports.setFlushedChannel = function (flushedChannel2) {
    flushedChannel =  flushedChannel2;
}
module.exports.setnWordUser = function (user) {
    nWordUser = user;
}
module.exports.getnWordUser = function()
{
    return nWordUser;
}
module.exports.setnWordUser = function (user) {
    nWordUser = user;
}
module.exports.getnWordCount = function () {
    return nWordCount;
}
module.exports.setnWordCount = function (count) {
    nWordCount = count;
}
module.exports.getGames = function(){
    return games;
}
module.exports.getTempChannels = function(){
    return tempChannels;
}
module.exports.getTempChannel = function (index) {
    return tempChannels[index];
}
module.exports.addGame = function(gameName){
    games.push(gameName);
}
module.exports.addTempChannel = function(newID2){
    tempChannels.push(newID2);
}
module.exports.getCooldowns = function () {
    return spunRecently;
}
module.exports.getCooldown = function (authorID) {
    return spunRecently[authorID];
}
module.exports.addCooldown = function (authorID,time)
{
    spunRecently[authorID] = time;
}
module.exports.deleteCooldown = function (authorID) {
    delete spunRecently[authorID];
}
module.exports.getDickPics = function () {
    return dickPics;
}


client.mongoose = require('./utils/mongoose.js')
client.mongoose.init();
// Here we load the config file that contains our token and our prefix values.
client.config = require("./config.js");
// client.config.token contains the bot's token
// client.config.prefix contains the message prefix

// Require our logger
client.logger = require("./modules/Logger");

// Let's start by getting some useful functions that we'll use throughout
// the bot, like logs and elevation features.
require("./modules/functions.js")(client);



// Aliases and commands are put in collections where they can be read from,
// catalogued, listed, etc.

client.commands = new Enmap();
client.aliases = new Enmap();

// Now we integrate the use of Evie's awesome EnMap module, which
// essentially saves a collection to disk. This is great for per-server configs,
// and makes things extremely easy for this purpose.
client.settings = new Enmap({
    name: "settings"
});

// We're doing real fancy node 8 async/await stuff here, and to do that
// we need to wrap stuff in an anonymous function. It's annoying but it works.

const EventsNotifier = require("./modules/EventsNotifier.js");
const init = async () => {

    // Here we load **commands** into memory, as a collection, so they're accessible
    // here and everywhere else.
    const commands = [];
    client.commands = new Collection();
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        // Set a new item in the Collection
        // With the key as the command name and the value as the exported module
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
    }
    // const cmdFiles = await readdir("./commands/");
    // client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
    // let commands = []
    // cmdFiles.forEach(f => {
    //     if (!f.endsWith(".js")) return;

    //     var cmd = new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!');
    //     commands.push(cmd.toJSON());
    // });

    console.log(process.env.CLIENT_TOKEN);
    const rest = new REST({ version: '9' }).setToken(process.env.CLIENT_TOKEN);

    rest.put(Routes.applicationGuildCommands('663955324654321674', '433786052931747840'), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);



    
    // const dickFiles = await readdir("./Dicks/");
    // client.logger.log(`Loading a total of ${dickFiles.length} dicks.`);

    // dickFiles.forEach(f => {
    //     if (!f.endsWith(".jpg")) return;
    //     dickPics.push(f.replace(/\.[^.]+$/, ''))
    // });

    // Then we load events, which will include our message and ready event.
    // const evtFiles = await readdir("./events/");
    // client.logger.log(`Loading a total of ${evtFiles.length} events.`);
    // evtFiles.forEach(file => {
    //     const eventName = file.split(".")[0];
    //     client.logger.log(`Loading Event: ${eventName}`);
    //     const event = require(`./events/${file}`);
    //     // Bind the client to any event, before the existing arguments
    //     // provided by the discord.js event. 
    //     client.on(eventName, event.bind(null, client));
    // });
    const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(`./events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }

    // Generate a cache of client permissions for pretty perm names in commands.
    // client.levelCache = {};
    // for (let i = 0; i < client.config.permLevels.length; i++) {
    //     const thisLevel = client.config.permLevels[i];
    //     client.levelCache[thisLevel.name] = thisLevel.level;
    // }
    console.log(process.env.CLIENT_TOKEN);
    client.login(process.env.CLIENT_TOKEN);

    EventsNotifier.CheckEvents(client);
};

init();
