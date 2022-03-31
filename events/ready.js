const discord = require("discord.js");
const config = require("../config/config.json")
const { logger, types }= require("../utils/logger")

client.on("ready", async () => {
    logger(`${client.user.tag} is online!`, types.SUCCESS)
});
