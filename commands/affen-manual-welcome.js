const Discord = require("discord.js");
module.exports = {
  name: "affen-send-welcome",
  execute(client, message, args) {
    message.delete().catch(_ => {});
    if (client.user.username === "Affen") {
      message.channel.send(
        "**Welcome to Echo Arena EU Teams! **The place to make a team, play other teams and generally advance the EU Echo Arena scene with the ultimate goal of defeating NA teams in tournaments. This is a *closed-off private space from NA players*, so don’t mention this server or talk about its contents. Keep discussions civil, don’t overly post memes or general pointless chatter. **Be respectful**, but as this is a competitive server some drama/salt/banter is expected between teams and players.\n\n**Mixed Scrims** are fun games with random players, kind of like public matches but with the same group playing each other in a private match. A mixed scrim group will keep playing for as long as they feel like it (often 1-2 hours), with players dropping out and new players joining in.\n\n**❗ Don’t join a mixed scrim unless you can play for at least 30 minutes, don’t ask for a mixed scrim unless you can play for about an hour.**\n\nOther than that, it’s first come first served. If you want to be alerted of these mixed scrims, join the @Scrimmer role by typing: `Affen scrimmer`\n\u200b\n**Team Scrims** are “practice dates” where two existing teams can train against each other, usually for a duration of 1-2 hours. If you are in a team you can tag the @Teams role and ask for a specific day or time, for example: @Teams scrims 7-9 SUK (UK Time)? If  you want to play, answer and set it up in the chat. Avoid private messaging responses if possible so others know that the spot is taken.\n\n**❗ Don’t ask for a team scrim unless you have made sure your team can actually accept it and play for at least an hour.**\n\n**Looking for teams role**: If you are looking for teams to join, assign yourself the @looking for team role by typing: `Affen looking for team`"
      );
    }
  }
};
