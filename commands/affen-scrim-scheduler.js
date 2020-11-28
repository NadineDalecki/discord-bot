module.exports = {
  name: "ss",
  execute(client, message, args) {
    if (client.user.username === "Mo") {
    message.channel.send("👀").then(async msg => await msg.react("👀")) 
    }
    
  }
};
