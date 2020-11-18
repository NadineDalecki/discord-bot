const Discord = require("discord.js");
const functions = require("../functions.js");

module.exports = {
  name: "cal-edit",
  async execute(client, message, args) {
    message.delete().catch(_ => {});

    if (client.user.username === "Mel") {
      const data = await functions.SpreadsheetGET(
          "1fh4j1hGY1XJH5lJ22bxOxZ-V3m_IRuwty8uopC3_NAQ", "1",
          process.env.CLIENT_EMAIL_MEL,
          process.env.PRIVATE_KEY_MEL.replace(/\\n/g, "\n")
        );

      const embed = new Discord.MessageEmbed()
        .setColor(data.rows[0].color)
        .setAuthor(data.rows[0].date, data.rows[0].thumbnail)
        .setTitle(data.rows[0].name)
        .setDescription(
          `${data.rows[0].description}\n\u200b\n**When?** ${data.rows[0].time}\n**Where?** ${data.rows[0].where}\n**Contact**: ${data.rows[0].organizer}`
        )
        .setThumbnail(data.rows[0].thumbnail);

      client.channels.cache
        .get("515097948720463873")
        .messages.fetch(args.shift())
        .then(msg => msg.edit(embed))
        .catch(console.error);
    }
  }
};
