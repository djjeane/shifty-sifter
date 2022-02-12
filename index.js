// This will check if the node version you are running is the required
// Node version, if it isn't it will throw the following error to inform
// you.
if (Number(process.version.slice(1).split(".")[0]) < 16)
  throw new Error(
    "Node 8.0.0 or higher is required. Update Node on your system."
  );

const { Client, Collection, Intents } = require("discord.js");
const fs = require("fs");
const env = require("dotenv").config();
const Path = require("path");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_INTEGRATIONS,
  ],
  allowedMentions: { parse: ["users", "roles"], repliedUser: true },
});

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

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

const init = async () => {
  const commands = [];
  client.commands = new Collection();

  //Add all the comands to the client.commands collection and store them in an array for the rest api
  let commandFiles = FindFilesInAllFolders("./commands");
  client.logger.log(`Loading a total of ${commandFiles.length} commands.`);
  for (const file of commandFiles) {
    const command = require(`./${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
  }

  //Add all the files in the listeners folder to the client.listeners collection
  let listenerFiles = FindFilesInAllFolders("./listeners");
  client.selectMenuListeners = new Collection();
  client.logger.log(`Loading a total of ${listenerFiles.length} listeners.`);
  for (const file of listenerFiles) {
    const listener = require(`./${file}`);
    client.selectMenuListeners.set(listener.Name, listener);
  }

  const eventFiles = fs
    .readdirSync("./events")
    .filter((file) => file.endsWith(".js"));
  client.logger.log(`Loading a total of ${eventFiles.length} events.`);
  for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }

  //pushes out the commands to the restful discord api
  const rest = new REST({ version: "9" }).setToken(process.env.CLIENT_TOKEN);

  rest
    .put(
      Routes.applicationGuildCommands(
        "663955324654321674",
        "433786052931747840"
      ),
      { body: commands }
    )
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);

  client.login(process.env.CLIENT_TOKEN);
};

function FindFilesInAllFolders(Directory) {
  let files = [];
  fs.readdirSync(Directory).forEach((File) => {
    const Absolute = Path.join(Directory, File);
    if (fs.statSync(Absolute).isDirectory()) {
      var subfiles = FindFilesInAllFolders(Absolute);
      files = files.concat(subfiles);
    } else {
      files.push(Absolute);
    }
  });
  return files;
}

init();
