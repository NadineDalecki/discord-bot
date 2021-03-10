module.exports = {
  name: "embed",
  async execute(client, Discord, message, functions, args, set) {
    message.delete().catch(_ => {})

    const data = await functions.SpreadsheetGET(client)
    const sheet = data.doc.sheetsByTitle["Embeds"]
    const rows = await sheet.getRows()

    let embed = rows.filter(embed => embed.name == args.join(" "))
    const finalEmbed = functions.EmbedBuilder(embed)
    message.channel.send(finalEmbed)
  }
};
