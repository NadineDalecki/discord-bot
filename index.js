const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen();

const BotTokens = [
  process.env.BOT_MEL,
  process.env.BOT_AFFEN,
  process.env.BOT_VRL,
  process.env.BOT_ITSY,
  process.env.BOT_BANE,
  process.env.BOT_KVN,
  process.env.BOT_TG
];
const set = require("./settings.json");
const userMap = new Map();
const functions = require("./functions.js");
const Discord = require("discord.js");
var giphy = require('giphy-api')(process.env.GIPHY);
const schedule = require("node-schedule");



// FOR EACH =========================================================================================================
BotTokens.forEach(runBot);

function runBot(token) {
  const client = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    clientOptions: {
      fetchAllMembers: true
    }
  });

client.on("error", error => functions.Error(client, error));

process.on("error", error => console.log(error));
process.on("uncaughtException", error => console.log(error));
process.on("unhandledRejection", error => console.log(error));
// GIF =========================================================================================================
  const rule = new schedule.RecurrenceRule();
  rule.hour = 18
  rule.minute = 01

  const job = schedule.scheduleJob(rule, async function() {
    if (client.user.username === "TG Bot")
    giphy.trending({
    limit: 1,
    rating: 'g',
    fmt: 'json'
}, function (err, res) {
client.channels.cache.get("563382017505361940").send(res.data[0].url)
});
  })
// GIF END ========================================================================================================= 
  client.on("messageReactionAdd", async (reaction, user) => {
    if (set[client.user.username].rrRolesFunction == true) {
      functions.RoleAdd(
        client,
        reaction,
        user,
        set[client.user.username].rrMessageId
      );
    } else if (set[client.user.username].rrScheduler == true) {
      await functions.Scheduler(client, reaction, user);
    }
  });

  client.on("messageReactionRemove", async (reaction, user) => {
    if (set[client.user.username].rrRolesFunction == true) {
      functions.RoleRemove(
        client,
        reaction,
        user,
        set[client.user.username].rrMessageId
      );
    } else if (set[client.user.username].rrScheduler == true) {
      await functions.Scheduler(client, reaction, user);
    }
  });

  client.once("ready", () => {
    client.user.setPresence({
      status: set[client.user.username].status,
      activity: {
        name: set[client.user.username].activity.name,
        url: set[client.user.username].activity.url,
        type: set[client.user.username].activity.type
      }
    });
    console.log(client.user.username + " Ready!");
  });

  client.login(token);
  // END =========================================================================================================
  client.on("message", async message => {
    if (client.user.id != message.author.id) {
      // COMMANDS =========================================================================================================
      if (message.content.startsWith(set[client.user.username].prefix)) {
        functions.Command(client, Discord, message, functions, set);
      } else if (
        // Dialogflow =========================================================================================================
        !message.content.startsWith(set[client.user.username].prefix) &&
        client.user.id != message.author.id
      ) {
        if (client.user.username === "Bane") {
          if (
            message.mentions.has(client.user.id) ||
            message.channel.type == "dm"
          ) {
            functions.DialogflowIntents(client, message, functions, set);
          }
        }  else if (client.user.username === "Affen") {
          if (
            message.content.toLowerCase().includes("affen") ||
            message.mentions.has(client.user.id) ||
            message.channel.type == "dm"
          ) {
            functions.DialogflowIntents(client, message, functions, set);
          }
        }else if (
          message.channel.type == "dm" ||
          (message.mentions.has(client.user.id) ||
            message.cleanContent.startsWith(client.user.username + " ") ||
            message.cleanContent.startsWith(
              client.user.username.toLowerCase() + " "
            ))
        ) {
          if (client.user.username === "Mel") {
            functions.SpamStop(
              client,
              message,
              userMap,
              set[client.user.username].muteRole
            );
            functions.DialogflowIntents(client, message, functions, set);
          } else {
            functions.DialogflowIntents(client, message, functions, set);
          }
        }

        // MENTIONS =========================================================================================================
        else if (
          (message.content.toLowerCase().includes("nada") ||
            message.content.toLowerCase().includes("na_da")) &&
          !message.author.bot &&
          !message.content.toLowerCase().includes("canada")
        ) {
          functions.Mention(client, message, "338649491894829057");
        } else if (
          message.content.toLowerCase().includes("sendo") &&
          !message.author.bot &&
          message.guild.id != "632570524463136779"
        ) {
          functions.Mention(client, message, "119095000050040832");
        } else if (
          message.content.toLowerCase().includes("hasko") &&
          !message.author.bot &&
          message.guild.id != "387015404092129282" && //EU
          message.guild.id != "421618914166833152" && //Gravity
          message.guild.id != "707307751033798666" && //Virtex
          message.guild.id != "424911215714631690" //Dungeon
        ) {
          functions.Mention(client, message, "335528823615651842");
        }
      }
    }
  });
}
