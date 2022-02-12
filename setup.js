const inquirer = require("inquirer");
const fs = require("fs");
const Enmap = require("enmap");
let baseConfig = fs.readFileSync("./config_base.txt", "utf8");

const defaultSettings = {
  "prefix": "!",
  "modLogChannel": "lavatory",
  "modRole": "Porcelain",
  "adminRole": "Ceramic",
  "systemNotice": "true",
  "welcomeChannel": "welcome",
  "welcomeMessage": "Flush after using.",~
  "welcomeEnabled": "True"
};

const settings = new Enmap({
  name: "settings",
  cloneLevel: 'deep',
  ensureProps: true
});


let prompts = [
  {
    type: "list",
    name: "resetDefaults",
    message: "Do you want to reset default settings?",
    choices: ["Yes", "No"]
  },
  {
    type: "input",
    name: "token",
    message: "Please enter the bot token from the application page."
  },
  {
    type: "input",
    name: "ownerID",
    message: "Please enter the bot owner's User ID"
  },
];

(async function () {
  console.log("Setting Up Sifty Configuration...");
  await settings.defer;
  if (!settings.has("default")) {
    prompts = prompts.slice(1);
    console.log("First Start! Inserting default guild settings in the database...");
    await settings.set("default", defaultSettings);
  }
  console.log("Got Here");

  baseConfig = baseConfig
    .replace("{{ownerID}}", "212993630233690113")
    .replace("{{token}}", "NjYzOTU1MzI0NjU0MzIxNjc0.XhZ_Tw.evTm2nD7ZZAe9_TasDzMl7vI0pM");

  fs.writeFileSync("./config.js", baseConfig);
  console.log("REMEMBER TO NEVER SHARE YOUR TOKEN WITH ANYONE!");
  console.log("Configuration has been written, enjoy!");
  await settings.close();
}());