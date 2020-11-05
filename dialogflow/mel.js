const Discord = require("discord.js");
const functions = require("../functions.js");

const key = process.env.PRIVATE_KEY_MEL.replace(/\\n/g, "\n");
const email = process.env.CLIENT_EMAIL_MEL;
const id = process.env.PROJECT_ID_MEL;

module.exports = {
  Function: async function(client, message) {
    const answer = await functions.DialogflowQuery(message, key, email, id);
    if (
      message.channel.type == "dm" ||
      !message.member.roles.cache.has("748631446217818123")
    ) {
      //=========================================================================================================
      if (answer.intent.substring(0, 5) === "embed") {
        const data = await functions.SpreadsheetGET(
          "1b-2t41LO_U5j8gJfxPS_rdg4Y8kINwMgSqUKpNdf4RE",
          email,
          key
        );
        let embed = data.rows.filter(row => row.name == answer.intent);
        const finalEmbed = functions.EmbedBuilder(embed);
        message.channel.send(finalEmbed);
      }
      //=========================================================================================================
      else if (
        answer.intent === "Sign Language" &&
        (message.channel.id == "328962843800109067" ||
          message.channel.type == "dm")
      ) {
        const data = await functions.SpreadsheetGET(
          "1RANvGrx6qRO1BFRqt_YQFoFYphJhcjOEUpBtnFpuoDo",
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
      else if (
        answer.intent === "Sign Commands" &&
        (message.channel.id == "328962843800109067" ||
          message.channel.type == "dm")
      ) {
        const data = await functions.SpreadsheetGET(
          "1RANvGrx6qRO1BFRqt_YQFoFYphJhcjOEUpBtnFpuoDo",
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
      else if (
        (answer.intent === "Register | Event" ||
          answer.intent === "Sheet | Looking for Team" ||
          answer.intent === "Sheet | Recruiting") &&
        message.channel.type != "dm"
      ) {
        message.reply(
          "Happy to help. Let's continue this conversation in a DM..."
        );
        message.author.send(answer.response);
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
            email,
            key,
            eventData
          );
        }
      }
      //=========================================================================================================
      else if (answer.intent === "Sheet | Looking for Team") {
        if (answer.result[0].queryResult.allRequiredParamsPresent === false) {
          message.reply(answer.response);
        } else if (
          answer.result[0].queryResult.allRequiredParamsPresent === true
        ) {
          message.reply(answer.response);
          const GetData = await functions.SpreadsheetGET(
            "1qqnjDjkd7SYutlk8n5WSpPKFv_gihXPd6gvjZO1_fNk",
            email,
            key
          );
          let playerRow = GetData.rows.filter(
            row => row.Id == message.author.id
          );
          if (playerRow[0]) {
            const positions = answer.result[0].queryResult.parameters.fields.position.listValue.values.map(
              position => position.stringValue
            );
            playerRow[0].Position = positions.join(", ");
            playerRow[0].Region =
              answer.result[0].queryResult.parameters.fields.region.stringValue;
            playerRow[0].League_Cup =
              answer.result[0].queryResult.parameters.fields.cup_type.stringValue;
            playerRow[0].Profile_Link =
              answer.result[0].queryResult.parameters.fields.profile_link.stringValue;
            playerRow[0].Level =
              answer.result[0].queryResult.parameters.fields.level.numberValue;
            playerRow[0].Date = new Date().toString().substring(4, 25);
            await playerRow[0].save();
          } else {
            const positions = answer.result[0].queryResult.parameters.fields.position.listValue.values.map(
              position => position.stringValue
            );
            const data = [
              {
                Id: message.author.id,
                Date: new Date().toString().substring(4, 25),
                Region:
                  answer.result[0].queryResult.parameters.fields.region
                    .stringValue,
                League_Cup:
                  answer.result[0].queryResult.parameters.fields.cup_type
                    .stringValue,
                Discord: message.author.tag,
                Profile_Link:
                  answer.result[0].queryResult.parameters.fields.profile_link
                    .stringValue,
                Level:
                  answer.result[0].queryResult.parameters.fields.level
                    .numberValue,
                Position: positions.join(", ")
              }
            ];
            const GetData = await functions.SpreadsheetPOST(
              "1qqnjDjkd7SYutlk8n5WSpPKFv_gihXPd6gvjZO1_fNk",
              email,
              key,
              data
            );
          }
        }
      } else if (answer.intent === "Sheet | Looking for Team - yes") {
        const GetData = await functions.SpreadsheetGET(
          "1qqnjDjkd7SYutlk8n5WSpPKFv_gihXPd6gvjZO1_fNk",
          email,
          key
        );
        let playerRow = GetData.rows.filter(row => row.Id == message.author.id);
        if (playerRow[0]) {
          playerRow[0].Description = message.cleanContent;
          await playerRow[0].save();
          message.reply(answer.response);
        }
      }
      //=========================================================================================================
      else if (answer.intent === "Sheet | Delete LFT - yes") {
        const GetData = await functions.SpreadsheetGET(
          "1qqnjDjkd7SYutlk8n5WSpPKFv_gihXPd6gvjZO1_fNk",
          email,
          key
        );
        try {
          let EntrytoDelete = GetData.rows.filter(
            row => row.Id == message.author.id
          );
          message.reply("Alright, I deleted your entry!");
          await EntrytoDelete[0].delete();
        } catch (e) {
          message.reply(
            "Sorry I could not find your entry. If there are any issues please contact na_da#9999"
          );
        }
      }
      //=========================================================================================================
      else if (answer.intent === "Sheet | Recruiting") {
        if (answer.result[0].queryResult.allRequiredParamsPresent === false) {
          message.reply(answer.response);
        } else if (
          answer.result[0].queryResult.allRequiredParamsPresent === true
        ) {
          message.reply(answer.response);
          const GetData = await functions.SpreadsheetGET(
            "1-X6Sy9Mi5pnGTFxZAMnIOrtVu7aKC-G__b4kOIm4tVs",
            email,
            key
          );
          let playerRow = GetData.rows.filter(
            row => row.Id == message.author.id
          );
          if (playerRow[0]) {
            const positions = answer.result[0].queryResult.parameters.fields.position.listValue.values.map(
              position => position.stringValue
            );
            playerRow[0].Position = positions.join(", ");
            playerRow[0].League_Cup =
              answer.result[0].queryResult.parameters.fields.cup_type.stringValue;
            playerRow[0].Region =
              answer.result[0].queryResult.parameters.fields.region.stringValue;
            playerRow[0].Profile_Link =
              answer.result[0].queryResult.parameters.fields.profile_link.stringValue;
            playerRow[0].Date = new Date().toString().substring(4, 25);
            await playerRow[0].save();
          } else {
            const positions = answer.result[0].queryResult.parameters.fields.position.listValue.values.map(
              position => position.stringValue
            );
            const data = [
              {
                Id: message.author.id,
                Date: new Date().toString().substring(4, 25),
                Region:
                  answer.result[0].queryResult.parameters.fields.region
                    .stringValue,
                League_Cup:
                  answer.result[0].queryResult.parameters.fields.cup_type
                    .stringValue,
                Discord: message.author.tag,
                Profile_Link:
                  answer.result[0].queryResult.parameters.fields.profile_link
                    .stringValue,
                Position: positions.join(", ")
              }
            ];
            const GetData = await functions.SpreadsheetPOST(
              "1-X6Sy9Mi5pnGTFxZAMnIOrtVu7aKC-G__b4kOIm4tVs",
              email,
              key,
              data
            );
          }
        }
      } else if (answer.intent === "Sheet | Recruiting - yes") {
        const GetData = await functions.SpreadsheetGET(
          "1-X6Sy9Mi5pnGTFxZAMnIOrtVu7aKC-G__b4kOIm4tVs",
          email,
          key
        );
        let playerRow = GetData.rows.filter(row => row.Id == message.author.id);
        if (playerRow[0]) {
          playerRow[0].Description = message.cleanContent;
          await playerRow[0].save();
          message.reply(answer.response);
        }
      }
      //=========================================================================================================
      else if (answer.intent === "Sheet | Delete REC - yes") {
        const GetData = await functions.SpreadsheetGET(
          "1-X6Sy9Mi5pnGTFxZAMnIOrtVu7aKC-G__b4kOIm4tVs",
          email,
          key
        );
        try {
          let EntrytoDelete = GetData.rows.filter(
            row => row.Id == message.author.id
          );
          message.reply("Alright, I deleted your entry!");
          await EntrytoDelete[0].delete();
        } catch (e) {
          message.reply(
            "Sorry I could not find your entry. If there are any issues please contact na_da#9999"
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
