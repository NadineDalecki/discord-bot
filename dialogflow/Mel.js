module.exports = {
  name: "Mel",
  execute: async function(client, message, set) {
    const Discord = require("discord.js");
    const functions = require("../functions.js");
    const key = process.env.PRIVATE_KEY_MEL.replace(/\\n/g, "\n");
    const email = process.env.CLIENT_EMAIL_MEL;
    const id = process.env.PROJECT_ID_MEL;
    const answer = await functions.DialogflowQuery(message, key, email, id);
    
    if (
      message.channel.type == "dm" ||
      !message.member.roles.cache.has("748631446217818123")
    ) {
      //=========================================================================================================
      if (answer.intent.substring(0, 5) === "embed") {
        const data = await functions.SpreadsheetGET(
          "1b-2t41LO_U5j8gJfxPS_rdg4Y8kINwMgSqUKpNdf4RE",
          0,
          email,
          key
        );
        let embed = data.rows.filter(row => row.name == answer.intent);
        const finalEmbed = functions.EmbedBuilder(embed);
        message.reply(finalEmbed);
      }
      //=========================================================================================================
      else if (
        answer.intent === "Sign Language" &&
        (message.channel.id == "328962843800109067" ||
          message.channel.type == "dm")
      ) {
        const data = await functions.SpreadsheetGET(
          "1RANvGrx6qRO1BFRqt_YQFoFYphJhcjOEUpBtnFpuoDo",
          0,
          email,
          key
        );
        const signName = answer.result[0].queryResult.parameters.fields.sign.stringValue.toLowerCase();

        try {
          let embed = data.rows.filter(
            row => row.name.toLowerCase() == signName
          );
          message.channel.send(embed[0].url);
        } catch (e) {
          message.reply("Sorry I could not find a sign for it!");
        }
      }
      //=========================================================================================================
      else if (answer.intent === "Invite | ?") {
        const data = await functions.SpreadsheetGET(
          "1b-2t41LO_U5j8gJfxPS_rdg4Y8kINwMgSqUKpNdf4RE",
          1,
          email,
          key
        );
        const serverName =
          answer.result[0].queryResult.parameters.fields["discord-server"]
            .stringValue;
        try {
          let server = data.rows.filter(row => row.server == serverName);
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
        const data = await functions.SpreadsheetGET(
          "1RANvGrx6qRO1BFRqt_YQFoFYphJhcjOEUpBtnFpuoDo",
          0,
          email,
          key
        );
        const commands = data.rows.map(commands => `${commands.name}`);
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
      else if (answer.intent === "Sheet | Event") {
        if (answer.result[0].queryResult.allRequiredParamsPresent === false) {
          message.reply(answer.response);
        } else if (
          answer.result[0].queryResult.allRequiredParamsPresent === true
        ) {
          message.reply(answer.response);
          const eventData = [
            {
              game:
                answer.result[0].queryResult.parameters.fields.game.stringValue,
              date:
                answer.result[0].queryResult.parameters.fields.date.stringValue,
              time:
                answer.result[0].queryResult.parameters.fields.time.stringValue,
              description: message.cleanContent,
              eventtype:
                answer.result[0].queryResult.parameters.fields.eventtype
                  .stringValue,
              timezone:
                answer.result[0].queryResult.parameters.fields.timezone
                  .stringValue,
              organizer: message.author.tag
            }
          ];
          functions.SpreadsheetPOST(
            "1fh4j1hGY1XJH5lJ22bxOxZ-V3m_IRuwty8uopC3_NAQ",
            0,
            email,
            key,
            eventData
          );
        }
      }
      //=========================================================================================================
      else if (answer.intent === "Meme") {
        if (
          message.channel.id == "333796567746084864" ||
          message.channel.type == "dm"
        ) {
          const data = await functions.SpreadsheetGET(
            "174nLCBKmlCodCXZRcuuzKOBPBNVbIVmY6xmyzpemhdY",
            0,
            email,
            key
          );
          const randomMeme =
            data.rows[Math.floor(Math.random() * data.rows.length)].meme;
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
