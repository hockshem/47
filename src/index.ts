require('dotenv').config();
import Discord = require("discord.js");
import CommandHandler from "./command_handler";
import config = require("./config.json");
import { validateEnvEntry } from "./utils/validation_util"; 

const client = new Discord.Client();
const token = validateEnvEntry(process.env.BOT_TOKEN);

client.on("ready", () => {
  console.log("47 is online.");
});

client.on("message", (message) => {
  CommandHandler.handleCommand(config.prefix, message);
});

client.on("error", (error) => {
  console.error(`Encountered an error: ${error.message}`, error);
});

client.login(token);
