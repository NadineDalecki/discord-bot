module.exports = {
  name: "map-ow",
  execute(client, message, args) {
    if (client.user.username === "VRL") {
      function shuffle(arr) {
        const result = [];
        for (let i = arr.length - 1; i >= 0; i--) {
          const r = Math.floor(Math.random() * (i + 1));
          for (let j = 0, k = 0; j <= arr.length - 1; j++) {
            if (result[j] === undefined) {
              if (k === r) {
                result[j] = arr[i];
                break;
              }
              k++;
            }
          }
        }
        return result;
      }
      let mapPool = [
        "Suburbia",
        "Downfall",
        "Quarantine",
        "Bazaar",
        "Cargo",
        "Subway"
      ];
      let maps = shuffle(mapPool);
      message.channel.send(
        `Round 1: ${maps[1]}\nRound 2: ${maps[2]}\nRound 3: ${
          maps[3]
        }\nRound 4: ${maps[4]}\nRound 5: ${maps[5]}\n`
      );
    }
  }
};
