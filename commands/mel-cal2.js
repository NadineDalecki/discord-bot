const Discord = require("discord.js");
const functions = require("../functions.js");
const datetime = require("node-datetime");

module.exports = {
  name: "calnew", //post calendar events
  async execute(client, message, args, set) {
    message.delete().catch(_ => {});
    if (client.user.username === "Mel") {
      if (
        message.member.roles.cache.has("326414022884982784") || //admin
        message.member.roles.cache.has("702591687096270848") || //mod
        message.member.hasPermission("ADMINISTRATOR")
      ) {
        const announcementInfoEmbed = new Discord.MessageEmbed()
          .setColor("#d6113c")
          .setTitle("Community News")
          .setDescription("Would you like a description?")
          
          .setFooter(
            "You would like your event or training to be announced in this channel too? DM @Hasko7#4977 by Thursday evening!",
            "https://cdn.discordapp.com/avatars/335528823615651842/5473cbdcf0977062c5a0324a72362a5b.png?size=256"
          );

        const data = await functions.SpreadsheetGET(
          set[client.user.username].spreadsheetID,
          process.env.CLIENT_EMAIL_MEL,
          process.env.PRIVATE_KEY_MEL.replace(/\\n/g, "\n")
        );

        const sheet = data.doc.sheetsByIndex[7];
        const rows = await sheet.getRows();

        rows.map(e =>
          announcementInfoEmbed.addField(
            `${e.thumbnail}　${e.date} | ${e.time} | ${e.name}`,
            `${e.description}\nBy ${e.organizer} in ${e.where}\n\u200b\n`
          )
        );
        message.channel.send(announcementInfoEmbed);
      }
    }
  }
};
