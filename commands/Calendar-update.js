module.exports = {
  name: "calendar-edit",
  async execute(client, Discord, message, functions, args, set) {
    message.delete().catch(_ => {});
    const adminRoles = set[client.user.username].adminRoles;
    if (
      message.member.roles.cache.some(r => adminRoles.includes(r.id)) ||
      message.member.hasPermission("ADMINISTRATOR")
    ) {
      const newEmbed = new Discord.MessageEmbed()
        .setColor("#d6113c")
        .setTitle("Community News")
        .setFooter(
          "You would like your event or training to be announced in this channel too? DM @Hasko7#4977 by Thursday evening!",
          "https://cdn.discordapp.com/avatars/335528823615651842/5473cbdcf0977062c5a0324a72362a5b.png?size=256"
        );

      const data = await functions.SpreadsheetGET(client);
      const sheet = data.doc.sheetsByTitle["Calendar"];
      const rows = await sheet.getRows();

      rows.map(e =>
        newEmbed.addField(
          `${e.thumbnail}　${e.date} | ${e.time} | ${e.name}`,
          `${e.description}\nContact ${e.organizer} in ${e.where}\n\u200b\n`
        )
      );

      const messageID = args[0];
      console.log(args[0]);

      client.channels.cache
        .get(args[0])
        .messages.fetch(args[1])
        .then(msg => msg.edit(newEmbed))
        .catch(console.error);
      console.log("Updating Embed");
    }
  }
};