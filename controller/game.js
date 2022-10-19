let Player = require("./player.js"),
  players = [];

module.exports = {
  handle: (socket) => {
    socket.on("new player", () => {
      players.push(Player.newPlayer(socket.id, socket.id));
      console.log("the player joined is", socket.id);
      socket.server.emit("update-game", players);
    });

    socket.on("option-selected", (opt) => {
      socket.server.emit("update option", opt);
    });
  },
};
