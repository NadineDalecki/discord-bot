const axios = require("axios");
var giphy = require('giphy-api')('GwL2a2DLk3CsCUnQQawoHaRKRtEVYdbm');

module.exports = {
    name: "stats",
    async execute(client, Discord, message, functions, args, set) {
        if (client.user.username === "Bane") {


            try {
                const stats = await axios.request({
                    url: `https://nykloo.com/api/PlayerInfos/Search?usernameQuery=${args.join(" ")}&page=0&pageSize=25`,
                    method: "get"
                });

                const embed = new Discord.MessageEmbed()
                    .setColor('#fca903')
                    .setTitle(stats.data[0].displayName)
                    .setDescription('Working on something cool...')
                    .setThumbnail(stats.data[0].avatorUrl)
                    .setFooter('Did you know? You can chat with Bane in DM! Try it!');

                message.reply(embed);
            }

            catch (e) {
                message.reply("Hm, sorry but I can't find someone with that name. 🤔")
            }
        }
    }
}
