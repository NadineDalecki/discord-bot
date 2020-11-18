module.exports = {
  name: "Itsy",
  execute: async function(client, message, set) {
    const Discord = require("discord.js");
    const functions = require("../functions.js");
    const key = process.env.PRIVATE_KEY_ITSY.replace(/\\n/g, "\n");
    const email = process.env.CLIENT_EMAIL_ITSY;
    const id = process.env.PROJECT_ID_ITSY;
    const axios = require("axios");
    const answer = await functions.DialogflowQuery(message, key, email, id);

    //=========================================================================================================
    if (answer.intent === "Webflow | What is?") {
      try {
        const data = await axios.request({
          url:
            "https://api.webflow.com/collections/5f5e48b99cb30538584249a1/items?live=true",
          method: "get",
          headers: {
            Authorization: process.env.WEBFLOW_ITSY,
            "accept-version": "1.0.0"
          }
        });

        const communities = data.data.items;

        const args =
          answer.result[0].queryResult.parameters.fields.Community.stringValue;
        let community = communities.filter(
          communities => communities.name.toLowerCase() === args.toLowerCase()
        );
        const embed = new Discord.MessageEmbed()
          .setColor("#0099ff")
          .setTitle(community[0].name)
          .setURL(
            `https://www.vrcommunitybuilders.com/communities/${community[0].slug}`
          )
          .setDescription(community[0]["discord-description"])
          .setThumbnail(community[0]["300x300-logo-on-black"].url)
          .setImage(community[0]["cover-image"].url);

        message.reply(embed);
      } catch (error) {
        message.reply(
          "Hm, sorry I could not find what you were looking for! 😟"
        );
        console.log(error);
      }
    } else {
      message.reply(answer.response);
    }
    //=========================================================================================================
  }
};
