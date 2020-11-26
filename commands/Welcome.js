const Discord = require("discord.js");

module.exports = {
  name: "welcome",
  execute(client, message, args, set) {
    message.delete().catch(_ => {});
    if (
      message.member.roles.cache.includes(set[client.user.username].adminRoles)
    ){
    /*  if (client.user.username === "VRL") {
        //=========================================================================================================
        {
          message.channel.send(VRL).then(async msg => {
            await msg.react("551077554543394827"); //echo arena
            await msg.react("551077555218939904"); //echo combat
            await msg.react("551077555487244289"); //onward
            await msg.react("551077662798643200"); //space junkies
            await msg.react("679384856551227392"); //pistol whip
            await msg.react("🇪🇺"); //eu
            await msg.react("519923682001289217"); //na
          });
        }
      }
      //=========================================================================================================
      else if (client.user.username === "Affen") {
        message.channel.send(Affen);
      }
      //=========================================================================================================
      else if (client.user.username === "Itsy") {
        message.channel.send(Itsy).then(async msg => {
          await msg.react("744177070162182275"); //Bagel
        });
      }
      //=========================================================================================================
      else if (client.user.username === "KVN") {
        message.channel.send(KVN1);
        message.channel.send(KVN2).then(async msg => {
          await msg.react("744481770296311848");
        });
      }
    //=========================================================================================================
      else if (client.user.username === "TG") {
        message.channel.send(TG).then(async msg => {
       await msg.react("748466627942809710");
       await msg.react("748466627854729276");
       await msg.react("748467374105165826");
       await msg.react("748466702244642926");
       await msg.react("748466627527442473");
       await msg.react("744481770296311848");
       await msg.react("748629381446107136");
      })
      } */
  }
}};

const Affen = new Discord.MessageEmbed()
  .setColor("#50d0d9")
  .setAuthor("Echo Arena Discord Europe")
  .setDescription("Please invite EU players only. We kick everybody else!")
  .addField(
    "RAD/Echo",
    "[Echo Games Discord](https://discord.echo.games/)\n[RAD Media Files](https://readyatdawn.sharefile.com/share/view/sbcabc88d34842d1b)\n[Echo Font](https://www.1001fonts.com/conthrax-font.html)",
    true
  )
  .addField(
    "VRML",
    "[Website](https://vrmasterleague.com/EchoArena/)\n[Matches](https://vrmasterleague.com/EchoArena/Matches/)\n[Standings EU](https://vrmasterleague.com/EchoArena/Standings/N2xDeWlHMGUvZGc90)\n[Rules](https://vrmasterleague.com/EchoArena/Rules/)\n[Twitch](https://www.twitch.tv/EchoArena_VRML)",
    true
  )
  .addField(
    "VRL",
    "[Discord](https://discord.gg/rEweeRh)\n[Twitch](https://www.twitch.tv/vrchallenger)",
    true
  )
  .addField(
    "Roles",
    "**Ask <@717431243662295150> for a role!** Start your sentence with Affen and just ask for the role in a somewhat understandable sentence.\n*For example: Affen give me the god damn Looking for team role*\n\n**Available Roles:**\n<@&509787093208399872> Tag this role if you need a substitute for a scrim or want to start a mixed scrim.\n<@&549925842646597651> Need a team? Assign yourself this role. With `?lft` you can see a list of all players looking for a team.\n**@Teams** is a role you can get from an admin once you joined a team. Please only ask teams for a scrim if you have a full team ready for at least an hour!",
    false
  )
  .addField(
    "Individual Team Roles",
    "You can get a mentionable team role once you have a full team on the VRML site and participated regularly in scrims with it. We do not create roles for planned teams.",
    false
  )
  .addField(
    "Trusted",
    "Once you spend some time with us on discord and in the arena you can ask for the @Trusted EU Member to be able to **create invites to the server**. We will ask others if they can confirm that you are from EU and are trustworthy before we eventually assign the role."
  );

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
    "\n\u200b\n[<:twitter:744176978747326546>](<https://twitter.com/vrcommbuilders>)\u2003\u2003[<:facebook:744176978806046813>](<https://www.facebook.com/groups/vrcommunitybuilders/>)\u2003\u2003[<:website:744176979103973436>](<https://www.vrcommunitybuilders.com/>)\n\u200b\n"
  )

  .addField(
    "ROLES",
    "If you identify with our values and promise to help us keeping this server a friendly and supportive place, then please react with our emoji to get full access to our server."
  );

const KVN1 = new Discord.MessageEmbed().setImage(
  "https://imgur.com/vGxoDU6.png"
);
const KVN2 = new Discord.MessageEmbed()
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
  );

const VRL = new Discord.MessageEmbed()
  .setColor("#ff0000")
  .setAuthor("Welcome to the Discord server of VR League!")
  .setURL("https://play.eslgaming.com/global/vrleague")
  .setDescription(
    "This server is intended for both the players and admins of VR League. Here you can find support for tournaments, discuss the game with other players and in general just talk with people. On the left you can find all of the channels, please join the ones you're interested in talking in and have a great time!\n\u200b\n"
  )
  .addField(
    "Rules",
    "1. Use correct channels specific to your needs and region.\n2. Not tolerated: Spamming, name calling, harassing or threatening.\n3. Respect admins and their decision about your problem.\n4. Do not post links to malicious content.\n5. Do not post advertisements/promote content unless admins agree.\n6. Impersonating other people or VRL admins is not allowed.\n7. VR League admins reserve the right to kick or ban a person if necessary."
  )
  .addField(
    "\u200b",
    "Please note that admins may not always be available. Discord is not an official support platform for VRL tournaments and as such if no admin is available help will need to be requested via a [support ticket](https://play.eslgaming.com/support) or [protest ticket](https://play.eslgaming.com/protest/add).\n\nFeel like you'd want to become a VRL Admin?\n [Write an application](http://play.eslgaming.com/echoarena/admin_application/)! (In English please)\n\u200b\n"
  )
  .addField(
    "Bot Commands",
    "Please note that all bot replies will be sent as DM. You can also access our FAQ by directly talking to the bot in a DM (beta stage).\n`!help` `!support` `!admin` `!commands` `!premium` `!trusted` `!apply`\n\u200B\n"
  )
  .addField(
    "Helpful Links",
    "[Echo Arena](http://play.eslgaming.com/echoarena)\n[Echo Combat](http://play.eslgaming.com/echocombat)\n[Pistol Whip](https://play.eslgaming.com/pistolwhip/)\n\u200b\n",
    true
  )
  .addField(
    "\u200b",
    "[Onward](http://play.eslgaming.com/onward)\n[Space Junkies](http://play.eslgaming.com/spacejunkies)\n\u200B\n",
    true
  )
  .addField(
    "\u200b",
    "[ESL Guide](http://esl.gg/ESLguide)\n[ESL Swiss FAQ](https://play.eslgaming.com/swiss-cup-faq)",
    true
  )
  .addField(
    "Roles",
    "Please react with a corresponding emoji to get your game/regional role assigned. With that role you will be able to see the game specific support channels.",
    false
  )
  .addField(
    "\u200B",
    "<:echoarena:551077554543394827> for <@&446981661368909824>\n<:echocombat:551077555218939904> for <@&551080412508848138>\n<:pistolwhip:679384856551227392> for <@&679365090226601994>",
    true
  )
  .addField(
    "\u200B",
    "<:onward:551077555487244289> for <@&462242156090753059>\n<:spacejunkies:551077662798643200> for <@&551080564241989656>",
    true
  )
  .addField(
    "\u200B",
    "🇪🇺 for <@&446982022368329728>\n<:flag_us_ca:519923682001289217> for <@&446982026046865409>",
    true
  );

const TG = new Discord.MessageEmbed()
  .setColor("#51c3e7")
  //.setAuthor("Welcome to the Virtex Stadium Discord server!")
  //.setTitle("Welcome to the Discord Server of Team Gravity!")
  //.setURL("https://virtexstadium.com")
  //.setThumbnail("https://i.imgur.com/Wlio7l2.png")
  .setDescription(
    "Stay up to date with the latest events and competitions and meet our teams! On the left you can find all of the channels, please join the ones you're interested in and have a great time!\n\u200b\n"
  )
  .addField(
    "RULES",
    "1. Use correct channels specific to your needs and region.\n2. Not tolerated: Spamming, name calling, harassing or threatening.\n3. Respect our staff and their decisions.\n4. Do not post links to malicious content.\n5. Do not advertise/promote content without permission.\n6. Impersonating others, especially staff or admins is not allowed.\n7. Our staff reserves the right to kick or ban a person.\n"
  )
  .addField(
    "\u200b",
    "*For more info check <#469509206840705024> and <#563392406741975081> after selecting a role.* \n\u200b\n"
  )

  .addField(
    "OUR TEAM",
    "<@&636249397205663764> \n<@221986262247145472> lives in his own timezone so be patient when asking him something. Otherwise a nice guy.\n\n<@&421641048155226113> \n<@338649491894829057> and <@102149885091921920> (the weird germans)  and <@216838050657861632> keep the server in order.\n\n <@&748528192909869192> \nOur players and team members, you can usually find them lurking around in their respective game channels!\n\u200b\n"
  )

  /*  .addField(
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
  ) */

  .addField(
    "SELECT ROLES",
    "Please react with one of the game emojis to get your Graviton role assigned and gain access to the game channels you are interested in. By reacting you agree to follow our server rules.\n\n <:arena:748466627942809710> | **Echo Arena**\n <:combat:748466627854729276> | **Echo Combat** \n<:towertag:748467374105165826> | **Tower Tag** \n<:beatsaber:748466702244642926> | **Beat Saber** \n<:pistolwhip:748466627527442473> | **Pistol Whip** \n<:gravity:744481770296311848> | **Gravitons** - *Not sure yet, just let me in!* \n<:vrheadset:748629381446107136> | **All Games** - *Who hurt you?* \n"
  );

/*
  .addField('', '<:arena:748466627942809710>  **Echo Arena**\n <:combat:748466627854729276>  **Echo Combat** \n<:towertag:748467374105165826>  **Tower Tag** \n<:beatsaber:748466702244642926>  **Beat Saber** \n<:pistolwhip:748466627527442473>  **Pistol Whip** \n<:gravity:744481770296311848>  **Gravitons** - Not sure yet, just let me in! \n<:vrheadset:748629381446107136>  **All Games** - Who hurt you? \n\u200b\n' )
/*
  .addField('\n<:gravity:744481770296311848>  **Gravitons**', 'Not sure yet, just let me in! \n\u200b\n' )
  .addField('<:arena:748466627942809710>  **Echo Arena**', '\n\u200b\n' )
	.addField('<:combat:748466627854729276>  **Echo Combat**', '\n\u200b\n' )
  .addField('<:towertag:748467374105165826>  **Tower Tag**', '\n\u200b\n' )
  .addField('<:beatsaber:748466702244642926>  **Beat Saber**', '\n\u200b\n' )
  .addField('<:pistolwhip:748466627527442473>  **Pistol Whip**', '\n\u200b\n' )
  .addField('<:vrheadset:748629381446107136>  **All Games**', 'Who hurt you? \n' )
/*
  .addField('───────────────────────────────\n<:gravity:744481770296311848>  **Gravitons**', 'Not sure yet, just let me in! \n───────────────────────────────' )
  .addField('/n', '<:arena:748466627942809710>  **Echo Arena** - Join our [Echo Arena](https://google.com) channels or join the official [Discord](https://google.com)\n───────────────────────────────' )
	.addField('<:combat:748466627854729276>  **Echo Combat**', 'Join our [Echo Combat](https://google.com) channels or join the official [Discord](https://google.com)\n───────────────────────────────' )
  .addField('<:towertag:748467374105165826>  **Tower Tag**', 'Join our [Tower Tag](https://google.com) channels or join the official [Discord](https://google.com)\n───────────────────────────────' )
  .addField('<:beatsaber:748466702244642926>  **Beat Saber**', 'Join our [Beat Saber](https://google.com) channels or join the official [Discord](https://google.com)\n───────────────────────────────' )
  .addField('<:pistolwhip:748466627527442473>  **Pistol Whip**', 'Join our [Pistol Whip](https://google.com) channels or join the official [Discord](https://google.com)\n───────────────────────────────' )
  .addField('<:vrheadset:748629381446107136>  **All Games**', 'Who hurt you? \n───────────────────────────────' )
*/
