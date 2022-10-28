document.addEventListener("DOMContentLoaded", () => {
  const socket = io("http://localhost:3000");

  const query = window.location.search.substring(1);
  const temp = query.split("&");
  const uid = temp[0].split("=");
  const usId = uid[1];

  // socket.emit("add_player", userId);

  const cat = temp[1].split("=");
  const category = cat[1];

  const p1 = document.getElementById("player_one");
  const p2 = document.getElementById("player_two");
  const p1Score = document.getElementById("player_one_score");
  const p2Score = document.getElementById("player_two_score");
  const verdict = document.getElementById("verdict");

  function getScore() {
    socket.emit("get_score", "", function (resp) {
      console.log("callback worked", resp);

      let player1 = resp.find((p) => p.id == usId);
      let arr = resp.filter((p) => p.id != usId);

      let player2 = arr[0];
      console.log("player1: ", player1, ", player2: ", player2);
      p1.innerText = usId;
      p2.innerText = player2.id;
      p1Score.innerText = `${player1.score}`;
      p2Score.innerText = `${player2.score}`;

      verdict.innerText =
        player1.score == player2.score
          ? "Game Tied"
          : player1.score > player2.score
          ? player1.id + " Won"
          : player2.id + " Won";

      sendResultToDb(player1, player2);
    });
  }

  async function sendResultToDb(player1, player2) {
    const headers = new Headers({ "Content-Type": "application/json" });

    let userId = player1.id;
    let opponent = player2.id;
    let myScore = player1.score;
    let opponentScore = player2.score;

    console.log("usid", usId, "opponent", opponent);
    debugger;
    if (usId != opponent) {
      // let data = {
      //   playerA: userId,
      //   playerB: opponent,
      //   winner:
      //     myScore == opponentScore
      //       ? "Game Tie"
      //       : myScore > opponentScore
      //       ? userId
      //       : opponent,
      //   category,
      // };

      let data = {
        username: usId == player1.id ? usId : opponent,
        result: [
          {
            opponent: usId == player1.id ? opponent : usId,
            winner:
              myScore == opponentScore
                ? "Game Tie"
                : myScore > opponentScore
                ? userId
                : opponent,
            category,
            date: new Date(),
          },
        ],
      };

      const opts = {
        method: "post",
        headers: headers,
        body: JSON.stringify(data),
      };

      try {
        const resp = await fetch("/quizResult/sendMulQuizResults", opts);
        console.log("resp is", resp);
      } catch (error) {
        console.log(error);
      }
    }
  }
  getScore();
});
