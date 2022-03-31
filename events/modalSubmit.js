const Discord = require("discord.js")
const config = require("../config/config.json")
const { Formatters } = require('discord.js');
const { logger, types } = require("../utils/logger")

client.on('modalSubmit', async (modal) => {
  if(modal.customId === 'support-modal' ){
      
    const firstResponse = modal.getTextInputValue('textinput-support-modal')

    let supportTicketCat = modal.member.guild.channels.cache.get(config.tickets.supportCategoryID);
    let role = modal.member.guild.roles.cache.get(config.tickets.supportRoleID);

       await modal.guild.channels.create(`${"ticket" + "-" + modal.user.username}`, {
          type: "GUILD_TEXT",
          topic: modal.user.id,
          parent: supportTicketCat,
          permissionOverwrites: [
            {
              id: modal.user.id,
              allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
            },
            {
              id: modal.guild.roles.everyone.id,
              deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
            },
            {
              id: role,
              allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
            },
          ]

        }).then(async channel => {
          const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
              .setCustomId("close-ticket")
              .setLabel("Close Ticket")
              .setEmoji("🔒")
              .setStyle("DANGER")
          )

          await modal.deferReply({ ephemeral: true })
          modal.followUp({ content: `Your support ticket has been created! ${channel}`, ephemeral: true })

          logger(`${modal.user.username}#${modal.user.discriminator} finished modal`, types.TICKETS)

          let embed = new Discord.MessageEmbed()
            .setAuthor(`${modal.user.username}#${modal.user.discriminator}`, modal.user.displayAvatarURL())
            .setTitle(config.embeds.title)
            .setDescription("Thank you for creating a support ticket!")
            .addField("Issue:", `\`${firstResponse ?? "None provided"}\``)
            .setColor(config.embeds.color)
            .setTimestamp()
          channel.send({ embeds: [embed], components: [row] })
        })
      
    
  }  
});