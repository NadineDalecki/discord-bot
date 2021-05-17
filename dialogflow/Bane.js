module.exports = {
  name: "Bane",
  execute: async function(client, message, set) {
    const Discord = require("discord.js");
    const functions = require("../functions.js");
    const answer = await functions.DialogflowQuery(client, message);
    const AskBaneChannel = "819541831086899230";

    const data = await functions.SpreadsheetGET(client);

    try {
      //=========================================================================================================
      if (
        answer.intent == "Default Welcome Intent" ||
        answer.intent.includes("Discord")
      ) {
        message.reply(answer.response);
        functions.Inform(client, answer, message);
      }
      //=================================================================
      else if (answer.intent.substring(0, 5) === "embed") {
        const rows = await data.doc.sheetsByTitle["Embeds"].getRows();
        let embed = rows.filter(row => row.name == answer.intent);
        const finalEmbed = functions.EmbedBuilder(embed);
        message.reply(finalEmbed);
      }
      //=========================================================================================================
      else if (
        message.channel.id == "736472663299719190" || //bot-mod
        message.channel.id == "819541831086899230" || //ask bane
        message.channel.type == "dm"
      ) {
        if (answer.intent === "Tip") {
          const sheet = data.doc.sheetsByTitle["Tips"];
          const rows = await sheet.getRows();
          const randomTip = rows[Math.floor(Math.random() * rows.length)].tip;
          message.reply("💡 " + randomTip);
        }
        if (answer.intent === "Meme") {
          const sheet = data.doc.sheetsByTitle["Memes"];
          const rows = await sheet.getRows();

          const data2 = rows[Math.floor(Math.random() * rows.length)].meme;

          message.reply(data2);
        }
        if (answer.intent === "Fun Fact") {
          const sheet = data.doc.sheetsByTitle["Fun Facts"];
          const rows = await sheet.getRows();
          const data3 = rows[Math.floor(Math.random() * rows.length)].fact;

          message.reply("🤣 " + data3);
        }
        //=========================================================================================================
        else if (answer.intent === "Locations") {
          if (answer.result[0].queryResult.allRequiredParamsPresent === false) {
            message.reply(answer.response);
          } else if (
            answer.result[0].queryResult.allRequiredParamsPresent === true
          ) {
            const sheet = data.doc.sheetsByTitle["Embeds"];
            const rows = await sheet.getRows();
            let embed = rows.filter(
              row =>
                row.name ==
                answer.result[0].queryResult.parameters.fields.locations
                  .stringValue
            );
            const finalEmbed = functions.EmbedBuilder(embed);
            message.reply(finalEmbed);
          }
        }
        //=========================================================================================================
        else if (answer.intent === "Skins") {
          if (answer.result[0].queryResult.allRequiredParamsPresent === false) {
            message.reply(answer.response);
          } else if (
            answer.result[0].queryResult.allRequiredParamsPresent === true
          ) {
            const sheet = data.doc.sheetsByTitle["Embeds"];
            const rows = await sheet.getRows();
            let embed = rows.filter(
              row =>
                row.name ==
                answer.result[0].queryResult.parameters.fields.Skins.stringValue
            );
            const finalEmbed = functions.EmbedBuilder(embed);
            message.reply(finalEmbed);
          }
        }
        //=========================================================================================================
        else if (answer.intent === "Weapons") {
          if (answer.result[0].queryResult.allRequiredParamsPresent === false) {
            message.reply(answer.response);
          } else if (
            answer.result[0].queryResult.allRequiredParamsPresent === true
          ) {
            const sheet = data.doc.sheetsByTitle["Embeds"];
            const rows = await sheet.getRows();

            let embed = rows.filter(
              row =>
                row.name ==
                answer.result[0].queryResult.parameters.fields.Weapon
                  .stringValue
            );
            const finalEmbed = functions.EmbedBuilder(embed);
            message.reply(finalEmbed);
          }
        }
        //=========================================================================================================
        else {
          message.reply(answer.response);
          functions.Inform(client, answer, message);
        }
      } else {
        if (answer.intent === "Tip") {
          const sheet = data.doc.sheetsByTitle["Tips"];
          const rows = await sheet.getRows();
          const data = rows[Math.floor(Math.random() * rows.length)].tip;
          client.channels.cache
            .get(AskBaneChannel)
            .send(`${message.author}` + "💡 " + data);
        }
        //=========================================================================================================
        if (answer.intent === "Meme") {
          const sheet = data.doc.sheetsByTitle["Memes"];
          const rows = await sheet.getRows();
          const data2 = rows[Math.floor(Math.random() * rows.length)].meme;

          client.channels.cache.get(AskBaneChannel).send(`${message.author}`);

          client.channels.cache.get(AskBaneChannel).send(data2);
        }
        //=========================================================================================================
        if (answer.intent === "Fun Fact") {
          const sheet = data.doc.sheetsByTitle["Fun Facts"];
          const rows = await sheet.getRows();
          const data3 = rows[Math.floor(Math.random() * rows.length)].fact;

          client.channels.cache
            .get(AskBaneChannel)
            .send(`${message.author}` + "🤣 " + data3);
        }
        //=========================================================================================================
        else if (answer.intent === "Locations") {
          if (answer.result[0].queryResult.allRequiredParamsPresent === false) {
            client.channels.cache.get(AskBaneChannel).send(answer.response);
          } else if (
            answer.result[0].queryResult.allRequiredParamsPresent === true
          ) {
            const sheet = data.doc.sheetsByTitle["Embeds"];
            const rows = await sheet.getRows();
            let embed = rows.filter(
              row =>
                row.name ==
                answer.result[0].queryResult.parameters.fields.locations
                  .stringValue
            );
            const finalEmbed = functions.EmbedBuilder(embed);
            client.channels.cache.get(AskBaneChannel).send(`${message.author}`);
            client.channels.cache.get(AskBaneChannel).send(finalEmbed);
          }
        }
        //=========================================================================================================
        else if (answer.intent === "Skins") {
          if (answer.result[0].queryResult.allRequiredParamsPresent === false) {
            client.channels.cache.get(AskBaneChannel).send(answer.response);
          } else if (
            answer.result[0].queryResult.allRequiredParamsPresent === true
          ) {
            const sheet = data.doc.sheetsByTitle["Embeds"];
            const rows = await sheet.getRows();
            let embed = rows.filter(
              row =>
                row.name ==
                answer.result[0].queryResult.parameters.fields.Skins.stringValue
            );
            const finalEmbed = functions.EmbedBuilder(embed);
            client.channels.cache.get(AskBaneChannel).send(`${message.author}`);
            client.channels.cache.get(AskBaneChannel).send(finalEmbed);
          }
        }
        //=========================================================================================================
        else if (answer.intent === "Weapons") {
          if (answer.result[0].queryResult.allRequiredParamsPresent === false) {
            client.channels.cache.get(AskBaneChannel).send(answer.response);
          } else if (
            answer.result[0].queryResult.allRequiredParamsPresent === true
          ) {
            const sheet = data.doc.sheetsByTitle["Embeds"];
            const rows = await sheet.getRows();

            let embed = rows.filter(
              row =>
                row.name ==
                answer.result[0].queryResult.parameters.fields.Weapon
                  .stringValue
            );
            const finalEmbed = functions.EmbedBuilder(embed);
            client.channels.cache.get(AskBaneChannel).send(`${message.author}`);
            client.channels.cache.get(AskBaneChannel).send(finalEmbed);
          }
        }
        //=========================================================================================================
        else {
          client.channels.cache
            .get(AskBaneChannel)
            .send(`${message.author}` + answer.response);
          functions.Inform(client, answer, message);
        }
        client.channels.cache
          .get(AskBaneChannel)
          .send(
            "If you have further questions let's continue our little chat here!"
          );
      }
    } catch (e) {
      client.users.cache.get(process.env.OWNER).send(e + " " + message);
      client.users.cache.get("335528823615651842").send(e + " " + message);
    }
    //=========================================================================================================
  }
};
