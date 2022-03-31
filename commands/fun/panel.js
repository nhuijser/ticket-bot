const Discord = require("Discord.js");
const { SlashCommandBuilder } = require("@Discordjs/builders");
const config = require("../../config/config.json");
const { logger, types} = require("../../utils/logger");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("panel")
    .setDescription("Send the ticket panel message")
    .addChannelOption((option) =>
      option.setName("channel").setDescription("Channel to send panel message to, if none set. Current channel will be used.").setRequired(false)
    ),

  async execute(interaction) {
    try {
      if (
        !interaction.member.permissions.has(
          Discord.Permissions.FLAGS.MANAGE_GUILD
        )
      ) {
        let embed = new Discord.MessageEmbed()
          .setAuthor(`${interaction.user.username}#${interaction.user.discriminator}`, interaction.user.displayAvatarURL())
          .setTitle("`❌ You have no permission for this command`")
          .setColor("RED")

        return interaction.reply({ embeds: [embed], ephemeral: true });
      }

      let channel = interaction.options.getChannel("channel")
      if(channel) {

        let embed = new Discord.MessageEmbed()
        .setTitle(config.embeds.title)
        .setDescription(config.embeds.description)
        .setColor(config.embeds.color)

        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setLabel(config.button.name)
                .setEmoji(config.button.emoji)
                .setCustomId('support')
                .setStyle(config.button.style),
    
        );

          channel.send({embeds: [embed], components: [row]})
      } else {
        let embed = new Discord.MessageEmbed()
        .setTitle(config.embeds.title)
        .setDescription(config.embeds.description)
        .setColor(config.embeds.color)

        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
                .setLabel(config.button.name)
                .setEmoji(config.button.emoji)
                .setCustomId('support')
                .setStyle(config.button.style),
        );
        interaction.channel.send({embeds: [embed], components: [row]})
      }
      interaction.reply({content: "Succesfully sent panel message!", ephemeral: true})
    } catch (e) {
      logger(`Error in panel command: ${e}`, types.ERROR)
    }
  },
};