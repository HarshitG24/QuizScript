document.addEventListener("DOMContentLoaded", () => {
  const socket = io("http://localhost:3000");

  socket.on("game_play", (allPlayers) => {
    console.log("result players", allPlayers);
    debugger;
  });
});
