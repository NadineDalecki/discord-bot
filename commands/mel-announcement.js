const functions = require("../functions.js");

module.exports = {
  name: "a",
  async execute(client, message, args) {
    //message.delete().catch(_ => {});
     if (
      client.user.username === "Mel" &&
      (message.member.roles.cache.has("326414022884982784") || //admin
      message.member.roles.cache.has("702591687096270848") || //mod
        message.member.hasPermission("ADMINISTRATOR"))
    ) {
      const data = await functions.SpreadsheetGET(
      "1b-2t41LO_U5j8gJfxPS_rdg4Y8kINwMgSqUKpNdf4RE", process.env.CLIENT_EMAIL_MEL, process.env.PRIVATE_KEY_MEL.replace(/\\n/g, "\n"),)
    
    let embed = data.rows.filter(embed => embed.name == args.join(" "));
    const finalEmbed = functions.EmbedBuilder(embed);
    message.channel.send(finalEmbed);
  }
  }
};

