const Discord = require("discord.js");
const functions = require("../functions.js");
const datetime = require("node-datetime");

module.exports = {
  name: "cal", //post calendar events
  async execute(client, message) {
    message.delete().catch(_ => {});
    if (client.user.username === "Mel") {
      if (
        message.member.roles.cache.has("326414022884982784") || //admin
        message.member.roles.cache.has("702591687096270848") || //mod
        message.member.hasPermission("ADMINISTRATOR")
      ) {
        const data = await functions.SpreadsheetGET(
          "1fh4j1hGY1XJH5lJ22bxOxZ-V3m_IRuwty8uopC3_NAQ",
          process.env.CLIENT_EMAIL_MEL,
          process.env.PRIVATE_KEY_MEL.replace(/\\n/g, "\n")
        );

        const embeds = data.rows.map(e =>
          message.channel.send(
            new Discord.MessageEmbed()
              .setColor(e.color)
              .setAuthor(
                e.date,
                e.thumbnail
              )
              .setTitle(e.name)
              .setDescription(
                `${e.description}\n\u200b\n**When?** ${e.time}\n**Where?** ${e.where}\n**Contact**: ${e.organizer}`
              )
              .setThumbnail(e.thumbnail)
          )
        )
      }
    }
  }
};
