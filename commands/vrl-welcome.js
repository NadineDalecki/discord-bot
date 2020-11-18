const Discord = require('discord.js');
const set = require("../info/settings.json");

const welcome = new Discord.MessageEmbed()
.setColor('#ff0000')
.setAuthor('Welcome to the Discord server of VR League!')
.setURL('https://play.eslgaming.com/global/vrleague')
.setDescription("This server is intended for both the players and admins of VR League. Here you can find support for tournaments, discuss the game with other players and in general just talk with people. On the left you can find all of the channels, please join the ones you're interested in talking in and have a great time!\n\u200b\n")
.addField('Rules', "1. Use correct channels specific to your needs and region.\n2. Not tolerated: Spamming, name calling, harassing or threatening.\n3. Respect admins and their decision about your problem.\n4. Do not post links to malicious content.\n5. Do not post advertisements/promote content unless admins agree.\n6. Impersonating other people or VRL admins is not allowed.\n7. VR League admins reserve the right to kick or ban a person if necessary.") 
.addField('\u200b',"Please note that admins may not always be available. Discord is not an official support platform for VRL tournaments and as such if no admin is available help will need to be requested via a [support ticket](https://play.eslgaming.com/support) or [protest ticket](https://play.eslgaming.com/protest/add).\n\nFeel like you'd want to become a VRL Admin?\n [Write an application](http://play.eslgaming.com/echoarena/admin_application/)! (In English please)\n\u200b\n")
.addField('Bot Commands', "Please note that all bot replies will be sent as DM. You can also access our FAQ by directly talking to the bot in a DM (beta stage).\n`!help` `!support` `!admin` `!commands` `!premium` `!trusted` `!apply`\n\u200B\n")
.addField('Helpful Links', '[Echo Arena](http://play.eslgaming.com/echoarena)\n[Echo Combat](http://play.eslgaming.com/echocombat)\n[Pistol Whip](https://play.eslgaming.com/pistolwhip/)\n\u200b\n', true)
.addField("\u200b", "[Onward](http://play.eslgaming.com/onward)\n[Space Junkies](http://play.eslgaming.com/spacejunkies)\n\u200B\n", true)
.addField("\u200b", "[ESL Guide](http://esl.gg/ESLguide)\n[ESL Swiss FAQ](https://play.eslgaming.com/swiss-cup-faq)", true)
.addField('Roles', 'Please react with a corresponding emoji to get your game/regional role assigned. With that role you will be able to see the game specific support channels.', false)
.addField('\u200B', '<:echoarena:551077554543394827> for <@&446981661368909824>\n<:echocombat:551077555218939904> for <@&551080412508848138>\n<:pistolwhip:679384856551227392> for <@&679365090226601994>', true)
.addField('\u200B', '<:onward:551077555487244289> for <@&462242156090753059>\n<:spacejunkies:551077662798643200> for <@&551080564241989656>', true)
.addField('\u200B', '🇪🇺 for <@&446982022368329728>\n<:flag_us_ca:519923682001289217> for <@&446982026046865409>', true)

module.exports = {
  name: 'welcome',
  execute(client, message, args) {
    message.delete().catch(_ => { });
      if (client.user.username === "VRL") {
        console.log(message.member.roles.cache)
    if (message.member.roles.cache.includes(set[client.user.username].adminRoles)) {   //arr1.some(r=> arr2.includes(r)
      try
      {
        message.channel.send(welcome).then(async msg => {
          await msg.react('551077554543394827'); //echo arena
          await msg.react('551077555218939904'); //echo combat
          await msg.react('551077555487244289'); //onward
          await msg.react('551077662798643200'); //space junkies
          await msg.react('679384856551227392'); //pistol whip
          await msg.react('🇪🇺'); //eu
          await msg.react('519923682001289217'); //na
          
        });                                 }
      catch (error){  
        client.channels.cache.get("546661343374213121").send("roles:" + error)
      }      
    }
  }
  }
}
