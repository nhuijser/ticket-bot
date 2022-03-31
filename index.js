const Discord = require("discord.js");
const config = require("./config/config.json");

client = new Discord.Client({
  
  partials: ["MESSAGE", "CHANNEL", "REACTION"],

  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_MESSAGES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGE_TYPING",
  ],

  presence: {
    activities: [{ name: `${config.status.text}`, type: config.status.type},],
  },

});

const discordModals = require('discord-modals') // Define the discord-modals package!
discordModals(client); // discord-modals needs your client in order to interact with modals
client.slashCommand = new Discord.Collection();

function requirehandlers() {
  ["commands", "events"].forEach((handler) => {
    try {
      require(`./handler/${handler}`);
    } catch (e) {
      console.log(e);
    }
  });
}
requirehandlers();

client.login(config.token);
