module.exports = {
  name: "Bane",
  execute: async function(client, message, set) {
    const Discord = require("discord.js");
    const functions = require("../functions.js");

    const key = process.env.PRIVATE_KEY_BANE.replace(/\\n/g, "\n");
    const email = process.env.CLIENT_EMAIL_BANE;
    const id = process.env.PROJECT_ID_BANE;
    const answer = await functions.DialogflowQuery(message, key, email, id);
    try {
      //=========================================================================================================
      if (
        answer.intent == "Default Welcome Intent" ||
        answer.intent.includes("Help") ||
        answer.intent.includes("Discord") ||
        answer.intent.includes("Game")
      ) {
        message.reply(answer.response);
        functions.Inform(client, answer, message);
      }
      //=========================================================================================================
      else if (
        message.channel.id == "736472663299719190" || //bot-mod
        message.channel.id == "776420085995929600" || //ask bane
        message.channel.id == "718176504437276682" || //dungeon log
        message.channel.type == "dm"
      ) {
        //=========================================================================================================
        if (answer.intent === "Tip") {
          const data = await functions.SpreadsheetGET(
            "1uokUp6aljOEhCEFPzHRzAJPJW4aVf-FvPJJrRSosS70",
            0,
            email,
            key
          );
          const randomTip =
            data.rows[Math.floor(Math.random() * data.rows.length)].tip;
          message.channel.send("💡 " + randomTip);
        }

        //=========================================================================================================
        else if (answer.intent === "Weapons") {
          if (answer.result[0].queryResult.allRequiredParamsPresent === false) {
            message.reply(answer.response);
          } else if (
            answer.result[0].queryResult.allRequiredParamsPresent === true
          ) {
            const data = await functions.SpreadsheetGET(
              "1EUd3czTty60S7WhFn9Y5leOtH0lOu2LhLEvkQ62eE50",
              0,
              email,
              key
            );
            let embed = data.rows.filter(
              row =>
                row.name ==
                answer.result[0].queryResult.parameters.fields.Weapon
                  .stringValue
            );
            const finalEmbed = functions.EmbedBuilder(embed);
            message.channel.send(finalEmbed);
          }
        }
        //=========================================================================================================
        else {
          message.reply(answer.response);
          functions.Inform(client, answer, message);
        }
      }
    } catch (e) {
      client.users.cache.get(process.env.OWNER).send(e + message);
    }
    //=========================================================================================================
  }
};