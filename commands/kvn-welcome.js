const Discord = require('discord.js');

const embed = new Discord.MessageEmbed()
  .setColor("##9842f5")
   //.setAuthor("Welcome to the Virtex Stadium Discord server!")
  .setTitle("Welcome to the Discord Server of Team Gravity!")
  //.setURL("https://virtexstadium.com")
  //.setThumbnail("https://i.imgur.com/Wlio7l2.png")
  .setDescription(
    "Stay up to date about events and competitions and meet our teams! On the left you can find all of the channels, please join the ones you're interested in talking in and have a great time!\n\u200b\n"
  )
  .addField(
    "RULES",
    "1. Use correct channels specific to your needs and region.\n2. Not tolerated: Spamming, name calling, harassing or threatening.\n3. Respect our staff and their decisions.\n4. Do not post links to malicious content.\n5. Do not advertise/promote content without permission.\n6. Impersonating others, especially staff or admins is not allowed.\n7. Our staff reserves the right to kick or ban a person.\n\u200b\n"
  )
//  .addField(
//    "Bot Commands",
//    "Our Bot is eager to learn and tries to be useful but at the moments it's stupid af so better just ask our staff if you need anything...\n\u200b\n"
//  )

 // .addField(
 //  "FOLLOW US",
 //   "[<:Twitter:726891771069595780>](https://virtexstadium.com/twitter)\u2001[<:Facebook:726891669210792067>](https://virtexstadium.com/facebook)\u2001[<:Youtube:726891824698097756>](https://virtexstadium.com/youtube)\u2001[<:Twitch:726891701423177839>](https://virtexstadium.com/twitch)\n\u200B\n",
 //   false
 // )
  .addField(
    "HELPFUL LINKS",
    "[Website](https://www.teamgravityvr.com/)\n[Twitter](https://twitter.com/TeamGravityVR)\n\u200b\n",
    true
  )
  .addField(
    "\u200b",
    "[Instagram](https://www.instagram.com/teamgravityvr/)\n[Facebook](https://www.facebook.com/teamgravityvr)\n\u200B\n",
    true
  )
    .addField(
    "\u200b",
    "[Twitch](https://www.twitch.tv/teamgravityvr)\n[Youtube](https://www.youtube.com/channel/UCpVwAuE6Ul63MTJAhI0DbRg)\n\u200B\n",
    true
  )
  .addField(
    "ROLES",
    "Please react with the emoji to get your Graviton role assigned and gain access to the full server. By reacting you agree to follow our server rules."
  )
const embed2 = new Discord.MessageEmbed()
 .setImage("https://imgur.com/vGxoDU6.png")
module.exports = {
  name: "we",
  execute: async function (message, client){
     message.delete().catch(_ => {});
     message.channel.send(embed2)
     message.channel.send(embed).then(async msg => {
        await msg.react("744481770296311848");
      })
      .catch(error => console.log(error));
  }
};


module.exports = {
  name: 'kvn-welcome',
  execute(client, message) {
    message.delete().catch(_ => { });
    if (client.user.username === "KVN") {
    if (message.member.hasPermission('ADMINISTRATOR')) {     
      message.channel.send(embed)
    }
  }
  }
}


