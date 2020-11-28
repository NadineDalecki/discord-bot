const Discord = require("discord.js");
const functions = require("../functions.js");

module.exports = {
  name: "cal-edit",
  async execute(client, message, args, set) {
    message.delete().catch(_ => {});

    if (client.user.username === "Mel") {
      const data = await functions.SpreadsheetGET(
        set[client.user.username].spreadsheetID,
        process.env.CLIENT_EMAIL_MEL,
        process.env.PRIVATE_KEY_MEL.replace(/\\n/g, "\n")
      );

      const sheet = data.doc.sheetsByIndex[4];
      const rows = await sheet.getRows();

      const embed = new Discord.MessageEmbed()
        .setColor(rows[0].color)
        .setAuthor(rows[0].date, rows[0].thumbnail)
        .setTitle(rows[0].name)
        .setDescription(
          `${rows[0].description}\n\u200b\n**When?** ${rows[0].time}\n**Where?** ${rows[0].where}\n**Contact**: ${rows[0].organizer}`
        )
        .setThumbnail(rows[0].thumbnail);

      client.channels.cache
        .get("515097948720463873")
        .messages.fetch(args.shift())
        .then(msg => msg.edit(embed))
        .catch(console.error);
    }
  }
};
