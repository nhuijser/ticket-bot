
const Discord = require("discord.js");
const config = require("../config/config.json");
const { Modal, TextInputComponent, showModal} = require('discord-modals') // Modal class
const { logger, types }= require("../utils/logger")

client.on("interactionCreate", async (interaction) => {
  try {
    const { commandName } = interaction;


    if (interaction.isCommand() || interaction.isContextMenu() || client.slashCommand.has(commandName)) {
      const command = await client.slashCommand.get(commandName)

      if (command) command.execute(interaction);
      logger(`${commandName} executed by ${interaction.user.username}#${interaction.user.discriminator}`, types.COMMAND)
    }

    if(interaction.isButton()) {

      // all id's used
      /**********************************************************
       * @param {1} Ticket_Open
      *********************************************************/ 
      let supportTicketCat = interaction.member.guild.channels.cache.get(config.tickets.supportCategoryID);
      let role = interaction.member.guild.roles.cache.get(config.tickets.supportRoleID);

      if(interaction.customId === "support") {

        ticketBool = false

        let alreadyTicketChannel = ""

        interaction.guild.channels.cache.forEach(async (channel) => {
          if (channel.name == "ticket-" + interaction.user.username.toLowerCase()) {
            // console.log(channel)
            ticketBool = true
            alreadyTicketChannel = channel
          }
        })

        if (ticketBool == true) return interaction.reply({ content: `You already have a ticket! ${alreadyTicketChannel}, if this is an error please contact a staff member of this server.`, ephemeral: true })

        const modal = new Modal() // We create a Modal
        .setCustomId('support-modal')
        .setTitle(config.popUp.title)
        .addComponents([
          new TextInputComponent() // We create a Text Input Component
          .setCustomId('textinput-support-modal')
          .setLabel(config.popUp.label)
          .setStyle('SHORT') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
          .setMinLength(0)
          .setMaxLength(30)
          .setPlaceholder('Type here...')
          .setRequired(false) // If it's required or not
        ]);

        showModal(modal, {
          client: client, // Client to show the Modal through the Discord API.
          interaction: interaction // Show the modal with interaction data.
        })

        logger("Sent ticket modal to " + `${interaction.user.username}#${interaction.user.discriminator}`, types.TICKETS)
      }

        /**********************************************************
       * @param {2} Ticket_Close
      *********************************************************/

         if (interaction.customId === "close-ticket") {

          let closeEmbed = new Discord.MessageEmbed()
            .setAuthor(`${interaction.user.username}#${interaction.user.discriminator}`, interaction.user.displayAvatarURL())
            .setTitle(config.embeds.title)
            .setDescription("Ticket will be closed in `5` seconds.")
            .setTimestamp()
            .setColor(config.embeds.color)
          interaction.reply({ embeds: [closeEmbed] })
  
          setTimeout(async function () {
            interaction.channel.delete()
          }, 5000);
  
          interaction.channel.messages.fetch(interaction.message.id).then(async message => {
  
            let embed = new Discord.MessageEmbed()
              .setAuthor(`${interaction.user.username}#${interaction.user.discriminator}`, interaction.user.displayAvatarURL())
              .setTitle(config.embeds.title)
              .setDescription("This ticket is being closed within **5** seconds.")
              .setColor(config.embeds.color)
              .setTimestamp()
  
            const row = new Discord.MessageActionRow().addComponents(
              new Discord.MessageButton()
                .setCustomId("close-ticket")
                .setLabel("Close Ticket")
                .setEmoji("🔒")
                .setStyle("DANGER")
                .setDisabled()
            )
  
            message.edit({ embeds: [embed], components: [row] })
  
  
            let ticketLog = `**Start of transcript - #${message.channel.name}**`
  
            await interaction.channel.messages.fetch({ limit: 100 }).then(async messages => {
              let finalMessages = messages.reverse()
              for (const [key, value] of finalMessages) {
                ticketLog += `\r\n\r\n[${new Date(value.createdAt).toLocaleString("en-US", { timeZone: "UTC" })} UTC] ${value.author?.tag ?? 'Unknown'}`
                ticketLog += `: ${value.content || "- Embed"}`
              }
            })
  
            ticketLog += `\n\n**End of transcript - #${message.channel.name}**`
  
            const transcript = new Discord.MessageAttachment(Buffer.from(ticketLog, 'utf-8'), `transcript-${interaction.channel.name}.txt`)
            if (interaction.member.guild.channels.cache.get(config.tickets.ticketLogChannelID)) {
              let ticketLogsChannel = interaction.guild.channels.cache.get(config.tickets.ticketLogChannelID)
  
              let user = interaction.guild.members.cache.get(interaction.channel.topic)
              const row2 = new Discord.MessageActionRow().addComponents(
                new Discord.MessageButton()
                  .setCustomId("ticketLogsInfo")
                  .setLabel(`${user.user.username}#${user.user.discriminator}'s ticket`)
                  .setDisabled(true)
                  .setStyle("SUCCESS"),
              )
              
              let ticketLogsEmbed = new Discord.MessageEmbed()
                .setTitle(config.embeds.title)
                .setFooter("This ticket was closed at")
                .addField("Ticket", `<#${interaction.channel.id}> (#${interaction.channel.name})`)
                .addField("Ticket closed by:", `${interaction.user.username}#${interaction.user.discriminator}`)
                .setColor(config.embeds.color)
                .setTimestamp()
  
              ticketLogsChannel.send({ embeds: [ticketLogsEmbed], files: [transcript], components: [row2]})
              logger("Ticket" + `#${interaction.channel.name} was closed`, types.TICKETS)
            }
  
            let acceptedEmbed = new Discord.MessageEmbed()
            .setAuthor(`${interaction.user.username}#${interaction.user.discriminator}`, interaction.user.displayAvatarURL())
            .setTitle(config.embeds.title)
            .setDescription(config.transcripts.descriptionMessage)
            .setColor(config.embeds.color)
            .setTimestamp()
 
            let user = interaction.guild.members.cache.get(interaction.channel.topic)
 
            try {
            await user.send({embeds: [acceptedEmbed], files: [transcript]})
            logger("Sent " + `${user.user.username}#${user.user.discriminator} ticket transcripts`, types.TICKETS)
            } catch (error) {
             interaction.channel.send({content: "This user has DM's disabled, couldn't send DM."})
             logger("Couldn't DM " + `${user.user.username}#${user.user.discriminator} ticket transcripts`, types.TICKETSERROR)
            }

          })

        }

  }

  
  } catch (e) {
    console.log(e)
  }
})