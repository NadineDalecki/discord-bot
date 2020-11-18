module.exports = {
  name: "KVN",
  execute: async function(client, message, set) {
    const Discord = require("discord.js");
    const functions = require("../functions.js");
    const key = process.env.PRIVATE_KEY_VRL.replace(/\\n/g, "\n");
    const email = process.env.CLIENT_EMAIL_VRL;
    const id = process.env.PROJECT_ID_VRL;
    const answer = await functions.DialogflowQuery(message, key, email, id);

    //=========================================================================================================
    if (message.channel.type == "dm") {
      message.reply(answer.response);
      functions.Inform(client, answer, message);
    }
    //=========================================================================================================
  }
};
