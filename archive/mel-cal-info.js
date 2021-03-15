const Discord = require("discord.js");
const functions = require("../functions.js");
const datetime = require("node-datetime");

module.exports = {
  name: "cal-info", //post calendar events
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
          .setTitle("Weekly Announcements in Community News")
          .setDescription(
            "You would like your event or training to be announced in this channel too? DM <@335528823615651842> by Thursday evening!"
          )
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/537419656181448716/774342289346002974/Untitled-1_1.png"
          );

        
        message.channel.send(announcementInfoEmbed);
      }
    }
  }
};
