module.exports = {
  name: "KVN",
  execute: async function(client, message, set) {
    const Discord = require("discord.js");
    const functions = require("../functions.js");
    const key = process.env.PRIVATE_KEY_KVN.replace(/\\n/g, "\n");
    const email = process.env.CLIENT_EMAIL_KVN;
    const id = process.env.PROJECT_ID_KVN;
    const answer = await functions.DialogflowQuery(message, key, email, id);

    //=========================================================================================================
    
      message.reply(answer.response);
    
    //=========================================================================================================
  }
};
