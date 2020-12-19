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
    const siteID = "5ed8826082212c5dc8270931"

    //=========================================================================================================
    if (answer.intent === "Webflow | What is?") {
      try {
        const CommunitiesData = await axios.request({
          url:
            "https://api.webflow.com/collections/5f5e48b99cb30538584249a1/items?live=true",
          method: "get",
          headers: {
            Authorization: process.env.WEBFLOW_ITSY,
            "accept-version": "1.0.0"
          }
        });
        
        const args = answer.result[0].queryResult.parameters.fields.Community.stringValue;
        let community = CommunitiesData.data.items.filter(
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
    } 
      //=========================================================================================================
    else if (answer.intent === "Webflow | Who is?") {
      try {
        const MemberData = await axios.request({
          url:
            "https://api.webflow.com/collections/5f5e48b99cb3050e664249a5/items?live=true",
          method: "get",
          headers: {
            Authorization: process.env.WEBFLOW_ITSY,
            "accept-version": "1.0.0"
          }
        });
        console.log(MemberData.data.items)
        const args = answer.result[0].queryResult.parameters.fields.Member.stringValue;
        let Member = MemberData.data.items.filter(
          member => member.name === args
        );
       
        const SocialMediaLinks = []
        
        if (Member[0]["facebook-link"]) {
          SocialMediaLinks.push(`[Facebook](${Member[0]["facebook-link"]}) `)
        }
        
        if (Member[0]["linkedin"]) {
          SocialMediaLinks.push(`[LinkedIn](${Member[0]["linkedin"]}) `)
        }
        
        if (Member[0]["twitter-link"]) {
          SocialMediaLinks.push(`[Twitter](${Member[0]["twitter-link"]}) `)
        }
        
        if (Member[0]["instagram"]) {
          SocialMediaLinks.push(`[Instagram](${Member[0]["instagram"]}) `)
        }
        
        if (Member[0]["youtube"]) {
          SocialMediaLinks.push(`[YouTube](${Member[0]["youtube"]}) `)
        }
        
        if (Member[0]["website"]) {
          SocialMediaLinks.push(`[Website](${Member[0]["website"]}) `)
        }
        
        const embed = new Discord.MessageEmbed()
          .setColor("#0099ff")
          .setTitle(Member[0].name)
          .setAuthor(Member[0]["discord-tag"] + " | " + Member[0]["job-title"], Member[0]["profile-picture"].url)
          .setURL(
            `https://www.vrcommunitybuilders.com/team/${Member[0].slug}`
          )
          .setDescription(Member[0]["bio-summary"])
          .setThumbnail(Member[0]["profile-picture"].url)
          .addField(`Connect with ${Member[0].nickname}`, SocialMediaLinks.join("	　"))
          .setFooter(`${Member[0].nickname} is a part of VRCB since`)
          .setTimestamp(Member[0]["created-on"])

        message.reply(embed);
      } catch (error) {
        message.reply(
          "Hm, sorry I could not find what you were looking for! 😟"
        );
        console.log(error);
      }
    }
     //=========================================================================================================
    else {
      message.reply(answer.response);
    }
    //=========================================================================================================
  }
};
