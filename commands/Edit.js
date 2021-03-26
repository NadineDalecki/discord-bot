module.exports = {
  name: "edit",
  async execute(client, Discord, message, functions, args, set) {
    message.delete().catch(_ => {});

    const adminRoles = set[client.user.username].adminRoles;
    if (
      message.member.roles.cache.some(r => adminRoles.includes(r.id)) ||
      message.member.hasPermission("ADMINISTRATOR")
    ) {
      const data = await functions.SpreadsheetGET(client);
      const sheet = data.doc.sheetsByTitle["Embeds"];
      const rows = await sheet.getRows();

      let embed = rows.filter(row => row.name == args[2]);
      const finalEmbed = functions.EmbedBuilder(embed);

      client.channels.cache
        .get(args[0])
        .messages.fetch(args[1])
        .then(msg => msg.edit(finalEmbed))
        .catch(console.error);
      console.log("Updating Embed");
    }
    
    
const Itsy = new Discord.MessageEmbed()
  .setThumbnail(
    "https://uploads-ssl.webflow.com/5ed8826082212c5dc8270931/5eeb4cbc1f492bf42313c31f_vrcb%20logo%20blue%20white.png"
  )
  .setColor("#007FC6")
  .setTitle("Welcome to the VR Community Builders Discord Server!")
  .setURL("https://www.vrcommunitybuilders.com")
  .setDescription(
    "Please join the channels you are interested in and have a great time!\n\u200b\n"
  )
  .addField(
    "OUR VALUES",
    "\n\u200b\n**RESPECT** | Respect others and be tolerant. Be a positive example in social media.\n\u200b\n**INTEGRITY** | Make choices with integrity and take responsibility for your decisions. Protect confidential or proprietary information.\n\u200b\n**SUPPORT** | Recognize and promote others whenever possible. Together we grow VR and make it accessible to as many people as possible.\n\u200b\n**COMMUNITY** | Welcome people at events and in immersive reality with a positive attitude. Community is our focus and we want them to feel comfortable from the first moment they put on a headset.\n\u200b\n*We reserve the right to mute, kick or ban if you spam, harass, impersonate others or post malicious content of any kind*.\n\u200b\n"
  )

  .addField(
    "HELPFUL LINKS",
    "\n\u200b\n[Discord](<https://discord.gg/7r9k2yM>)\u2003\u2003[Twitter](<https://twitter.com/vrcommbuilders>)\u2003\u2003[Facebook](<https://www.facebook.com/VRCommunityBuilders>)\u2003\u2003[Website](<https://www.vrcommunitybuilders.com/>)\n\u200b\n"
  )
  }
}
