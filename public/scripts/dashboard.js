const query = window.location.search;
const urlParams = new URLSearchParams(query);
const userID = urlParams.get("userID");

const cat_re = document.getElementById("cat_re")
cat_re.onclick = function(e) {
  window.location.href = 
    "http://localhost:3000/categories.html?userID=" + userID
}

const signout = document.getElementById("sign_out")
signout.onclick = function(e) {
  window.location.replace("/")
}

async function fetchScore() {
  const resp = await fetch("/quizResult/fetchSingleScore/" + userID);
  data = await resp.json();
  return data;
}

async function fetchMulScore() {
  const resp = await fetch("/quizResult/fetchMulScore/" + userID);
  data = await resp.json();
  return data;
}

document.addEventListener("DOMContentLoaded", async () => {
  const data = await fetchScore();

  const mulData = await fetchMulScore();
  console.log("multiple quiz data", mulData);
  const table = document.querySelector(".records");
  const multable = document.querySelector(".mulRecords");
  const deleteBtn = document.getElementById("delete_user");

  const username = document.querySelector(".username")
  username.innerHTML = userID

  data.forEach((val) => {
    let score = val.score;
    let date = val.date;
    let topic = val.category;

    date = new Date(date);
    date = date.toDateString().split(" ");
    date = date[1] + " " + date[2] + " " + date[3];

    const row = document.createElement("tr");
    const score_d = document.createElement("td");
    const topic_d = document.createElement("td");
    const date_d = document.createElement("td");

    score_d.innerHTML = score;
    date_d.innerHTML = date;
    topic_d.innerHTML = topic;

    row.appendChild(topic_d);
    row.appendChild(score_d);
    row.appendChild(date_d);

    table.appendChild(row);
  });

  if(mulData) {
  mulData.forEach((val) => {
    console.log(val);
    let opponent = val.opponent;
    let date = val.date;
    let winner = val.winner;
    let cat = val.category;

    cat = cat.replace("%20"," ")

    date = new Date(date);
    date = date.toDateString().split(" ");
    date = date[1] + " " + date[2] + " " + date[3];

    const row = document.createElement("tr");
    const topic_d = document.createElement("td");
    const opponent_d = document.createElement("td");
    const winner_d = document.createElement("td");
    const date_d = document.createElement("td");

    topic_d.innerHTML = cat;
    date_d.innerHTML = date;
    opponent_d.innerHTML = opponent;

    if (opponent == winner) {
      winner_d.innerHTML = "You Lost";
    } else if (opponent == userID) {
      winner_d.innerHTML = "You Won";
    } else {
      winner_d.innerHTML = "Tie";
    }

    row.appendChild(topic_d);
    row.appendChild(opponent_d);
    row.appendChild(winner_d);
    row.appendChild(date_d);

    multable.appendChild(row);
  });
}

  deleteBtn.addEventListener("click", async () => {
    const headers = new Headers({ "Content-Type": "application/json" });

    const opts = {
      method: "delete",
      headers: headers,
    };

    const resp = await fetch("/newuser/deleteUser/" + userID, opts);
    if (resp.status == 200) window.location.replace("http://localhost:3000/");
  });
});
