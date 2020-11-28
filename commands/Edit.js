const Discord = require("discord.js");
module.exports = {
  name: "edit",
  execute(client, message, args, set) {
    message.delete().catch(_ => {});
    if (message.member.hasPermission("ADMINISTRATOR")) {
      client.channels.cache
        .get(args[0])
        .messages.fetch(args[1])
        .then(msg => msg.edit(embed))
        .catch(console.error);
      const embed = new Discord.MessageEmbed()
        .setColor("#d6113c")
        .setTitle("Weekly Announcements in Community News")
        .setDescription(
          "You would like your event or training to be announced in this channel too? DM <@335528823615651842> by Thursday evening!"
        )
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/537419656181448716/774342289346002974/Untitled-1_1.png"
        );
    }
  }
};
