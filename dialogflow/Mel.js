module.exports = {
  name: "Mel",
  execute: async function(client, message, set) {
    const Discord = require("discord.js");
    const functions = require("../functions.js");
    const key = process.env.PRIVATE_KEY_MEL.replace(/\\n/g, "\n");
    const email = process.env.CLIENT_EMAIL_MEL;
    const id = process.env.PROJECT_ID_MEL;
    const answer = await functions.DialogflowQuery(message, key, email, id);

    const data = await functions.SpreadsheetGET(
      set[client.user.username].spreadsheetID,
      email,
      key
    );

    if (
      message.channel.type == "dm" ||
      !message.member.roles.cache.has("748631446217818123")
    ) {
      //=========================================================================================================
      if (answer.intent.substring(0, 5) === "embed") {
        const sheet = data.doc.sheetsByIndex[0];
        const rows = await sheet.getRows();
        let embed = rows.filter(row => row.name == answer.intent);
        const finalEmbed = functions.EmbedBuilder(embed);
        message.reply(finalEmbed);
      }
      //=========================================================================================================
      else if (
        answer.intent === "Sign Language" &&
        (message.channel.id == "328962843800109067" ||
          message.channel.type == "dm")
      ) {
        const signName = answer.result[0].queryResult.parameters.fields.sign.stringValue.toLowerCase();
        const sheet = data.doc.sheetsByIndex[6];
        const rows = await sheet.getRows();
        try {
          let embed = rows.filter(
            row => row.name.toLowerCase().includes(signName)
          );
          message.channel.send(embed[0].url);
        } catch (e) {
          message.reply("Sorry I could not find a sign for it!");
        }
      }
      //=========================================================================================================
      else if (answer.intent === "Invite | ?") {
        const sheet = data.doc.sheetsByIndex[1];
        const rows = await sheet.getRows();
        const serverName =
          answer.result[0].queryResult.parameters.fields["discord-server"]
            .stringValue;
        try {
          let server = rows.filter(row => row.server == serverName);
          message.reply(server[0].description);
        } catch (e) {
          console.log(e);
        }
      }
      //=========================================================================================================
      else if (
        answer.intent === "Sign Commands" &&
        (message.channel.id == "328962843800109067" ||
          message.channel.type == "dm")
      ) {
        const sheet = data.doc.sheetsByIndex[6];
        const rows = await sheet.getRows();
        const commands = rows.map(commands => `${commands.name}`);
        const embed = new Discord.MessageEmbed().setDescription(
          commands.join(" | ")
        );
        message.channel.send(embed);
      }
      //=========================================================================================================
      else if (answer.intent === "Spam | Spoon") {
        message.react("754602236163915788");
      }
      //=========================================================================================================
      else if (answer.intent.substring(0, 4) === "Spam") {
        const allowedChannels = ["328962843800109067", "688765312023396374"]; //bot channel, meme channel
        if (
          allowedChannels.includes(message.channel.id) ||
          message.channel.type == "dm"
        ) {
          message.reply(answer.response);
        } else {
          message.reply(
            "Try that again in the <#328962843800109067> or in a DM!"
          );
        }
      }
      //=========================================================================================================
      else if (answer.intent === "Meme") {
        if (
          message.channel.id == "333796567746084864" ||
          message.channel.type == "dm"
        ) {
          const sheet = data.doc.sheetsByIndex[2];
          const rows = await sheet.getRows();
          const randomMeme =
            rows[Math.floor(Math.random() * rows.length)].meme;
          message.channel.send(randomMeme);
        } else {
          message.reply(
            "Try that again in the <#333796567746084864> or in a DM!"
          );
        }
      }
      //=========================================================================================================
      else if (message.channel.id !== "333796567746084864") {
        message.reply(answer.response);
        functions.Inform(client, answer, message);
      }
    }
  }
};
