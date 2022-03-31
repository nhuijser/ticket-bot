const discord = require("discord.js");
const fs = require("fs");
const { logger, types }= require("../utils/logger")

client.events = new discord.Collection();

const EventFiles = fs.readdirSync("./events/").filter((f) => f.endsWith(".js"));
EventFiles.forEach((file) => {
  require(`../events/${file}`);
});
logger(`${EventFiles.length} Events Loaded`, types.SUCCESS);
