let Player = require("./player.js"),
  players = [],
  options = [];

let playersObj = {};
let scarr = [];

module.exports = {
  handle: (socket) => {
    socket.on("new player", () => {
      players.push(Player.newPlayer(socket.id, socket.id));
      socket.server.emit("update-game", players);

      if (players.length == 2) {
        socket.server.emit("game_players", players);
        // socket.server.emit("return_players", playersObj);
      }
    });

    socket.on("option-selected", (data) => {
      options = options.filter((d) => d.id != data.id);
      options.push(data);

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
    });

    socket.on("clear-players", () => {
      // socket.server.emit("game_players", players);
      socket.server.emit("return_players", playersObj);

      players = [];
      players.slice(0, players.length);
    });

    socket.on("add_player", (p) => {
      playersObj[p] = "";
      console.log("player object", playersObj);
    });

    socket.on("update_result", (scoreArr) => {
      scarr = scoreArr;
      // console.log("reached here", scoreArr);
      // socket.server.emit("game_play", scoreArr);
      // socket.server.emit("get_score", scoreArr);
    });

    // socket.on("get_score", () => {
    //   console.log("works from result page");
    //   socket.server.emit("get_score", scarr);
    // });

    socket.on("get_score", function (data, fn) {
      fn(scarr);
    });
  },
};
