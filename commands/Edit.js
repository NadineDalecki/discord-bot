module.exports = {
  name: "edit",
  async execute(client, Discord, message, functions, args, set) {
    message.delete().catch(_ => {});
    if (message.member.hasPermission("ADMINISTRATOR")) {
      const data = await functions.SpreadsheetGET(client);
      const sheet = data.doc.sheetsByTitle["Embed Update"];
      const rows = await sheet.getRows();

      let embed = rows.filter(row => row.name == args[2]);
      const finalEmbed = functions.EmbedBuilder(embed);

      client.channels.cache
        .get(args[0])
        .messages.fetch(args[1])
        .then(msg => msg.edit(finalEmbed))
        .catch(console.error);
      console.log("Updating Embed")
    }
  }
};
