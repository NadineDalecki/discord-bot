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
  process.env.BOT_MO
];
const set = require("./info/settings.json");
const userMap = new Map();
const functions = require("./functions.js");
const Discord = require("discord.js");

process.on("error", error => console.log(error));
process.on("uncaughtException", error => console.log(error));
process.on("unhandledRejection", error => console.log(error));

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
  client.on("messageDelete", async message => {
    if (set[client.user.username].deletedMessages == true) {
      functions.DeletedMessage(client, message);
    }
  });

  client.on("guildMemberAdd", guildMember => {
    if (set[client.user.username].guildLogs == true) {
      client.channels.cache
        .get(set[client.user.username].logChannel)
        .send(
          `${guildMember.username} joined\nMember count: ${guildMember.guild.memberCount}`
        );
    }
    if (
      set[client.user.username].JoinDM == true &&
      guildMember.guild.id == set[client.user.username].guildId
    ) {
      try {
        setTimeout(function() {
          guildMember.send(set[client.user.username].JoinDMText);
        }, 3000);
      } catch (error) {
        functions.error(client, error);
      }
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
    if (
      set[client.user.username].rrRolesFunction == true &&
      reaction.message.id == set[client.user.username].rrMessageId
    ) {
      functions.RoleAdd(
        client,
        reaction,
        user,
        set[client.user.username].rrMessageId
      );
    }
  });
  client.on("messageReactionRemove", async (reaction, user) => {
    if (
      set[client.user.username].rrRolesFunction == true &&
      reaction.message.id == set[client.user.username].rrMessageId
    ) {
      functions.RoleRemove(
        client,
        reaction,
        user,
        set[client.user.username].rrMessageId
      );
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
        functions.Command(client, message, set[client.user.username].prefix);
      } else {
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
            functions.DialogflowIntents(client, message, set);
          } else {
            functions.DialogflowIntents(client, message, set);
          }
        }
      }
    }
  });
}
