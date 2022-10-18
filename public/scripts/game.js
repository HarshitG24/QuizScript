document.addEventListener("DOMContentLoaded", () => {
  const socket = io("http://localhost:3000");

  const multiplayer_quiz = document.getElementById("multiplayer_quiz");
  const myGameCode = document.getElementById("generated_game_code");
  const start_game = document.getElementById("start_game");

  multiplayer_quiz.addEventListener("click", () => {
    socket.emit("new player", myGameCode);
  });

  socket.on("update-game", (players) => {
    console.log("total players", players);
    let me = socket.id;
    console.log(players.flatMap((player) => player.name));

    let hasGameStarted = () => {
      return players.find((player) => player.active == true);
    };

    if (hasGameStarted()) {
      let active = players.find((player) => player.active == true);
      console.log(active.name + " is active");
    }

    if (players.length == 2) {
      start_game.click();
    }
  });
});
