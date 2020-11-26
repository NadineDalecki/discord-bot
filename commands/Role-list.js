// Type prefix+rl role-id to get a list of all users with that ID. Helpful since the role list in discord is not reliable.
module.exports = {
  name: "rl",
  execute(client, message, args) {
   message.delete().catch(_ => {});
      const names = message.guild.roles.cache
        .get(args.toString())
        .members.map(m => m.user.tag.replace(/_/g, "\\_"));
      if (names === "") {
        message.channel.send("Nope");
      } else {
        message.channel.send(names);
      }
    
  }
};
