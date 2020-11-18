const Discord = require("discord.js");

const embed = new Discord.MessageEmbed()
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
    "\n\u200b\n[<:twitter:744176978747326546>](<https://twitter.com/vrcommbuilders>)\u2003\u2003[<:facebook:744176978806046813>](<https://www.facebook.com/groups/vrcommunitybuilders/>)\u2003\u2003[<:website:744176979103973436>](<https://www.vrcommunitybuilders.com/>)\n\u200b\n"
  )

  .addField(
    "ROLES",
    "If you identify with our values and promise to help us keeping this server a friendly and supportive place, then please react with our emoji to get full access to our server."
  );

module.exports = {
  name: "welcome",
  execute(client, message, args) {
    if (client.user.username === "Itsy") {
      message.channel
        .send(embed)
        .then(async msg => {
          await msg.react("744177070162182275");
        })
        .catch(error => console.log(error));
    }
  }
};
