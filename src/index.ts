require('dotenv').config();
import Discord = require("discord.js");
import Config = require("./config.json");
import CommandHandler from "./command_handler";

const client = new Discord.Client();
const token = process.env.TOKEN;

try { 
  validateToken(token);
} catch (error) {
  console.error(`Encountered an error while validating token: ${error.message}`);
}

client.on("ready", () => {
  console.log("47 is online.");
});

client.on("message", (message) => {
  CommandHandler.handleCommand(Config.prefix, message);
});

client.on("error", (error) => {
  console.error(`Encountered an error: ${error.message}`, error);
});

client.login(token);

function validateToken(token: string | undefined ) {
  if (!token) {
    throw new Error("Invalid bot token.");
  }
}