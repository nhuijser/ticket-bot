const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { logger, types }= require("../utils/logger")
const config = require("../config/config");
const { readdirSync } = require("fs");
const ascii = require("ascii-table");
let cmds = [];
let table = new ascii("Commands")

readdirSync("./commands/").forEach((dir) => {
  const commandFiles = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));

//   for (const file of commandFiles) {
//     const slashCommand = require(`../commands/${dir}/${file}`);
//     client.slashCommand.set(slashCommand.data.name, slashCommand);
//   }
// });

for (const file of commandFiles) {
  const slashCommand = require(`../commands/${dir}/${file}`);
  client.slashCommand.set(slashCommand.data.name, slashCommand);
  if (slashCommand.data.name) {
    table.addRow(file, "✅");
  } else {
    table.addRow(file, "❌ -> Failed loading");
    continue;
  }
}

console.log(table.toString())

})

const rest = new REST({ version: "9" }).setToken(config.token);

(async () => {
  try {
    for (let i = 0; i < client.slashCommand.toJSON().length; i++) {
      cmds.push(client.slashCommand.toJSON()[i].data.toJSON());
    }

      await rest.put(Routes.applicationGuildCommands(config.self.clientID, config.self.guildID), {
        body: cmds,
      })
      logger("Succesfully pushed Slash Commands to Discord", types.SUCCESS);
  } catch (err) {
    logger("Failed to push Slash Commands to Discord", types.ERROR);
  }
})();