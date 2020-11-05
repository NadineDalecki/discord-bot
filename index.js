const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen();

const BotTokens = [
  process.env.BOT_MEL,
  process.env.BOT_AFFEN,
  process.env.BOT_VRL
];
const set = require("./info/settings.json");
const userMap = new Map();
const functions = require("./functions.js");
const Discord = require("discord.js");
const df_mel = require("./dialogflow/mel.js");
const df_affen = require("./dialogflow/affen.js");
const df_vrl = require("./dialogflow/vrl.js");

// FOR EACH =========================================================================================================
BotTokens.forEach(runBot);

function runBot(token) {
  const client = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    clientOptions: {
      fetchAllMembers: true
    }
  });

  process.on("error", error => functions.Error(client, error));
  process.on("uncaughtException", error => functions.Error(client, error));
  process.on("unhandledRejection", error => functions.Error(client, error));
  client.on("error", error => functions.Error(client, error));
  client.on("messageDelete", async message => {
    functions.DeletedMessage(client, message);
  });

  client.on("guildMemberAdd", member => {
    if (set[client.user.username].guildLogs == true) {
      client.channels.cache
        .get(set[client.user.username].logChannel)
        .send(`${member} joined\nMember count: ${member.guild.memberCount}`);
    }
  });
  client.on("guildMemberRemove", member => {
    if (set[client.user.username].guildLogs == true) {
      client.channels.cache
        .get(set[client.user.username].logChannel)
        .send(
          `${member.user.username} left\nMember count: ${member.guild.memberCount}`
        );
    }
  });
  client.on("guildBanAdd", function(guild, user, member) {
    if (set[client.user.username].guildLogs == true) {
      client.channels.cache
        .get(set[client.user.username].logChannel)
        .send(
          `${member.user.username} banned\nMember count: ${member.guild.memberCount}`
        );
    }
  });

  client.on("messageReactionAdd", async (reaction, user) => {
    functions.RoleAdd(
      client,
      reaction,
      user,
      set[client.user.username].rrMessageId
    );
  });
  client.on("messageReactionRemove", async (reaction, user) => {
    functions.RoleRemove(
      client,
      reaction,
      user,
      set[client.user.username].rrMessageId
    );
  });

  client.once("ready", () => {
    client.user.setActivity(set[client.user.username].activity.text, {
      url: set[client.user.username].activity.url,
      type: set[client.user.username].activity.type
    });
    console.log(client.user.username + " Ready!");
  });

  client.login(token);
  // END =========================================================================================================

  const GravityWatchChannels = [
    "630095256964300801",
    "630095400811888650",
    "630095256964300801",
    "630095221149138965"
  ];

  client.on("message", async message => {
    // TG REPOST =========================================================================================================
    if (
      client.user.username === "Mel" &&
      (GravityWatchChannels.includes(message.channel.id) &&
        message.author.bot &&
        message.content.includes("Team Gravity") &&
        !message.content.includes("scores"))
    ) {
      try {
        client.channels.cache.get("743091749282381845").send(message);
      } catch (e) {
        console.log(e);
      }
    }
    if (!message.author.bot && message.cleanContent.length <= 256) {
      // MENTIONS =========================================================================================================
      if (
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
      }
      // Dialogflow =========================================================================================================
      else if (
        (client.user.id != message.author.id &&
          !message.content.startsWith(set[client.user.username].prefix) &&
          message.channel.type == "dm") ||
        (message.cleanContent.startsWith("@" + client.user.username + " ") ||
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
          df_mel.Function(client, message);
        } else if (client.user.username === "Affen") {
          df_affen.Function(client, message);
        } else if (
          message.channel.type == "dm" &&
          client.user.id != message.author.id &&
          !message.content.startsWith(set[client.user.username].prefix)
        ) {
          df_vrl.Function(client, message);
        }
      }
    }
    // COMMANDS =========================================================================================================
    else if (!message.content.startsWith(set[client.user.username].prefix))
      return;
    functions.Command(client, message, set[client.user.username].prefix);
  });
}
