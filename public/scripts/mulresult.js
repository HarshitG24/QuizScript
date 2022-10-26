document.addEventListener("DOMContentLoaded", () => {
  const socket = io("http://localhost:3000");

  socket.on("game_players", (allPlayers) => {
    console.log(allPlayers);
  });
});
