module.exports = {
  name: "VRL",
  execute: async function(client, message, set) {
    const Discord = require("discord.js");
    const functions = require("../functions.js");
    const key = process.env.PRIVATE_KEY_VRL.replace(/\\n/g, "\n");
    const email = process.env.CLIENT_EMAIL_VRL;
    const id = process.env.PROJECT_ID_VRL;
    const answer = await functions.DialogflowQuery(message, key, email, id);

    //=========================================================================================================
    if (answer.intent === "Streams"){
      const embed = new Discord.MessageEmbed()
        .setColor("#a60000")
        .setTitle("VR League Live!")
        .setDescription(
          "Join us on:\n\n[Facebook](https://www.facebook.com/WatchVRLeague/)\n[YouTube](https://www.youtube.com/channel/UC85OKmyt3WFiCQhlI0MJEyw)\n[Twitch](https://www.twitch.tv/vrchallenger)"
        )
        .setThumbnail(
          "https://cdn.glitch.com/764cdacc-5716-4297-9bd5-b7bb588da8f7%2FVRL_LOGO_STYLIZED_VERT.jpg?1551546161735"
        );
      
      message.channel.send(embed)
    }
    else if (message.channel.type == "dm") {
      message.reply(answer.response);
      functions.Inform(client, answer, message);
    }
  
    //=========================================================================================================
  }
};
