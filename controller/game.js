let Player = require("./player.js"),
  players = [],
  options = [],
  correctAns = "";

module.exports = {
  handle: (socket) => {
    socket.on("new player", () => {
      players.push(Player.newPlayer(socket.id, socket.id));
      console.log("the player joined is", socket.id);
      socket.server.emit("update-game", players);
    });

    socket.on("option-selected", (data) => {
      options = options.filter((d) => d.id != data.id);
      options.push(data);

      console.log("options", options);
      if (options.length == 2) {
        // options.forEach((o) => {
        //   socket.server.emit("update option", o.opt);
        // });

        socket.server.emit("update option", options);

        // socket.server.emit("update-index");
      }
    });

    socket.on("clear-options", () => {
      options = [];
      options.slice(0, options.length);
      console.log("options length", options.length);
    });
  },
};
