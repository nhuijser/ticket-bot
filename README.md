# Ticket-Bot

## 📜 Description

I made this "template"/discord bot to learn more about DiscordJS v13 & Modals.

Feel free to use this repository as your own Discord bot, it's made for that.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## 💻 Installation

Download an IDE [here](https://code.visualstudio.com/)

Load up the project, once done. Download node [here](https://nodejs.org/en/) and restart your IDE.

Use `npm install` to install all the modules needed. Replace the all the variables in `config/config.json` with your own bot information from [here](https://discord.dev) & Discord ID's & preferences.

Change your bot token at the top of the file to your own from [here](https://discord.dev)
```json
"token": "",
```

You can change the bot status by replacing `text` with anything you'd like, the options for type are: `COMPETING, PLAYING, LISTENING, WATCHING` 

```json
  "status": {
    "text": "ticket bots",
    "type": "COMPETING" 
  },
```
Under `self` change `clientID` to your bot Application ID or Client ID, change `guildID` to the guild you're willing to use the bot in.

```json
  "self": {
    "clientID": "",
    "guildID": ""
  },
```

Under `tickets` change `supportCategoryID` to the category ID you want tickets to be placed in, `supportRoleId` to the role you want to be able to to view tickets & `ticketLogsChannelID` to a channel you want ticket logs in (optional)

```json
  "tickets": {
    "supportCategoryID": "",
    "supportRoleID": "",
    "ticketLogsChannelID": ""
  },
```

Under `popUp` change the `title` & `label` to something you think fits, example for both below.

```json
  "popUp": {
    "title": "This is config.popUp.title",
    "label": "This is config.popUp.label"
  },
```
![Example](https://imgur.com/COe6oGb.png)

For embeds, it's all personal preference. There's an example of the message below.

```json
  "embeds": {
      "color": "GREEN",
      "title": "🎟 Support Tickets",
      "description": "This is `config.embeds.description`",
      "footer": "Ticket Bot"
  },
```
![Example](https://imgur.com/u1KTYUd.png)

For transcripts there's only a changeable description, it uses `config.embeds.title` for the title.

```json
  "transcripts": {
    "descriptionMessage" : "This is `config.transcripts.descriptionMessage`"
  },
```
![Example](https://imgur.com/4U5xxXC.png)

You can change the button styles, the variables for styles are shown below in an image from [discordjs.guide](https://discordjs.guide/interactions/buttons.html#button-styles)

```json
  "button": {
    "name": "Support Button",
    "emoji": "🎟",
    "style": "PRIMARY"
  }
```

![Example](https://imgur.com/nQt8oFJ.png)

That's all you have to change to get the bot working, to change anything code-related I will not help you, you should be able to figure out on your own.

Final step: 
Open up terminal by clicking at the top navigation bar and use the command `npm install` & then `node index.js` or `node .` to launch the bot


## 🚪 Inviting the bot

Go over to your app at [discord.dev](https://discord.dev) and click on `OAuth2` and then `URL Generator`, select for scopes `bot` & `applications.command`, permissions is only `Administrator`. Copy the link and invite the bot to your server!

## 🖱 Usage

To send a `panel` message, use the `/panel` command. This will send a message in the channel you're currently in or the one you've specified. If this doesn't work, make sure you did all the steps in [Installation](#installation) right!

Once everything is setup, double check by using the bot and using the buttons, opening a ticket, closing a ticket etc.

## Suggestions/problems

If you find any problems, please try to fix them and create a PR/Issue.

If you have any suggestions, create an issue.
