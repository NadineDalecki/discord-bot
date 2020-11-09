const Discord = require("discord.js");
const functions = require("../functions.js");

const key = process.env.PRIVATE_KEY_BANE.replace(/\\n/g, "\n");
const email = process.env.CLIENT_EMAIL_BANE;
const id = process.env.PROJECT_ID_BANE;

const set = require("../info/settings.json");

const allowedChannels = ["736472663299719190"];

module.exports = {
  Function: async function(client, message) {
    const answer = await functions.DialogflowQuery(message, key, email, id);

    //=========================================================================================================
    if (answer.intent.substring(0, 5) === "embed") {
      const data = await functions.SpreadsheetGET(
        "1EUd3czTty60S7WhFn9Y5leOtH0lOu2LhLEvkQ62eE50",
        email,
        key
      );
      let embed = data.rows.filter(row => row.name == answer.intent);
      const finalEmbed = functions.EmbedBuilder(embed);
      message.channel.send(finalEmbed);
      functions.Inform(client, answer, message);
    } //=========================================================================================================
    else if (answer.intent === "Tip") {
      if (
        message.channel.id == "736472663299719190" || //bot-mod
        message.channel.id == "723791800158126131" || //gameplay-advice
        message.channel.type == "dm"
      ) {
        const data = await functions.SpreadsheetGET(
          "1uokUp6aljOEhCEFPzHRzAJPJW4aVf-FvPJJrRSosS70",
          email,
          key
        );
        const randomTip =
          data.rows[Math.floor(Math.random() * data.rows.length)].tip;
        message.channel.send("💡 " + randomTip);
      } else {
        message.reply("Psst! I only give tips in a DM! Just ask me there 👀");
      }
      functions.Inform(client, answer, message);
    }
    //=========================================================================================================
    else if (answer.intent === "Help | Weapons") {
      const data = await functions.SpreadsheetGET(
        "1EUd3czTty60S7WhFn9Y5leOtH0lOu2LhLEvkQ62eE50",
        email,
        key
      );
      let embed = data.rows.filter(
        row =>
          row.name ==
          answer.result[0].queryResult.parameters.fields.Weapon.stringValue
      );
      const finalEmbed = functions.EmbedBuilder(embed);
      message.channel.send(finalEmbed);
      functions.Inform(client, answer, message);
    } else if (
      answer.intent == "Default Welcome Intent" ||
      answer.intent.includes("Help") ||
      answer.intent.includes("Discord") ||
      answer.intent.includes("Beta") ||
      answer.intent.includes("Game") ||
      answer.intent.includes("embed")
    ) {
      message.reply(answer.response);
      functions.Inform(client, answer, message);
    }
    //=========================================================================================================
    else if (
      message.channel.type == "dm" ||
      message.channel.id == "736472663299719190"
    ) {
      message.reply(answer.response);
      functions.Inform(client, answer, message);
    }
    //=========================================================================================================
  }
};
