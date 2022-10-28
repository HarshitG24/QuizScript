document.addEventListener("DOMContentLoaded", () => {
  const socket = io("http://localhost:3000");

  function getScore() {
    socket.emit("get_score", "", function (resp) {
      console.log("callback worked", resp);
    });
  }

  socket.on("get_score", (scoreArr) => {
    console.log("got the output", scoreArr);
  });

  getScore();
});

// module.exports = {
//   score: (socket) => {
//     socket.on("game_play", (scoreArr) => {
//       console.log("result players", scoreArr);
//       debugger;
//     });
//   },
// };
