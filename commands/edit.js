const Discord = require('discord.js');
module.exports = {
  name: 'edit',
  execute(message, args) {
    message.delete().catch(_ => { });
    if (message.member.hasPermission("ADMINISTRATOR")) {     
      message.channel.fetchMessage(args.shift())
        .then(msg => msg.edit(embed))
        .catch(console.error)
    }
  }
}

const embed = new Discord.MessageEmbed()

