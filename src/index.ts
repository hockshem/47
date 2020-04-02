require('dotenv').config();
import Discord = require("discord.js");
import CommandHandler from "./command_handler";
import config = require("./config.json");
import { validateEnvEntry } from "./utils/validator"; 

const client = new Discord.Client();
const token = validateEnvEntry(process.env.BOT_TOKEN);

client.on("ready", () => {
  console.log("47 is online.");
});

client.on("message", async (message) => {
  if (message.content === "I love you") {
    if (isBotOwner(message.author)) {
      await message.reply("I love you too. <3");
      return;
    }
  }
  CommandHandler.handleCommand(config.prefix, message);
});

client.on("error", (error) => {
  console.error(`Encountered an error: ${error.message}`, error);
});

client.login(token);

async function isBotOwner(user: Discord.User) {
  const owner = await client.users.fetch("378048007599423491");
  return user === owner;
}
