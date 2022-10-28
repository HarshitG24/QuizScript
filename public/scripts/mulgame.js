document.addEventListener("DOMContentLoaded", async () => {
  let questions = [];
  let question;
  let iSelected = false;
  let currentIndex = 0;
  let playerObj = {};
  let opponent = "";

  let myScore = 0;
  let opponentScore = 0;
  const socket = io("http://localhost:3000");

  // The login to display options dynamically
  const display_ques = document.getElementById("display_question");
  const optionA = document.getElementById("optionA");
  const optionB = document.getElementById("optionB");
  const optionC = document.getElementById("optionC");
  const optionD = document.getElementById("optionD");

  const optA = document.getElementById("optA");
  const optB = document.getElementById("optB");
  const optC = document.getElementById("optC");
  const optD = document.getElementById("optD");

  // const score1 = document.getElementById("score1");
  // const score2 = document.getElementById("score2");

  const query = window.location.search.substring(1);
  const temp = query.split("&");
  const uid = temp[0].split("=");
  const userId = uid[1];

  socket.emit("add_player", userId);

  const cat = temp[1].split("=");
  const category = cat[1];

  if (category != undefined && category != null && category != "") {
    const resp = await fetch("/questions/" + category);
    questions = await resp.json();
    questions = questions.data;

    displayQuestions(currentIndex);
  }

  function displayQuestions(currentIndex) {
    question = questions[currentIndex];
    display_ques.innerText = question.ques;

    let options = question.options;
    optionA.innerText = "A) " + options[0];
    optionB.innerText = "B) " + options[1];
    optionC.innerText = "C) " + options[2];
    optionD.innerText = "D) " + options[3];
  }

  function optionSelected(opt) {
    socket.emit("option-selected", { id: userId, opt });
  }

  function clearActiveSelection() {
    // Clear my option
    if (optA.classList.contains("my_selection")) {
      optA.classList.toggle("my_selection");
    } else if (optB.classList.contains("my_selection")) {
      optB.classList.toggle("my_selection");
    } else if (optC.classList.contains("my_selection")) {
      optC.classList.toggle("my_selection");
    } else if (optD.classList.contains("my_selection")) {
      optD.classList.toggle("my_selection");
    }

    // Clear opponent option
    if (optA.classList.contains("opponent_selection")) {
      optA.classList.toggle("opponent_selection");
    } else if (optB.classList.contains("opponent_selection")) {
      optB.classList.toggle("opponent_selection");
    } else if (optC.classList.contains("opponent_selection")) {
      optC.classList.toggle("opponent_selection");
    } else if (optD.classList.contains("opponent_selection")) {
      optD.classList.toggle("opponent_selection");
    }

    // Clear correct ans
    if (optA.classList.contains("correct_ans")) {
      optA.classList.toggle("correct_ans");
    } else if (optB.classList.contains("correct_ans")) {
      optB.classList.toggle("correct_ans");
    } else if (optC.classList.contains("correct_ans")) {
      optC.classList.toggle("correct_ans");
    } else if (optD.classList.contains("correct_ans")) {
      optD.classList.toggle("correct_ans");
    }
  }

  optA.addEventListener("click", () => {
    if (!iSelected) {
      iSelected = true;
      optA.classList.toggle("my_selection");
      optionSelected(1);
    }
  });
  optB.addEventListener("click", () => {
    if (!iSelected) {
      iSelected = true;
      optB.classList.toggle("my_selection");
      optionSelected(2);
    }
  });
  optC.addEventListener("click", () => {
    if (!iSelected) {
      iSelected = true;
      optC.classList.toggle("my_selection");
      optionSelected(3);
    }
  });
  optD.addEventListener("click", () => {
    if (!iSelected) {
      iSelected = true;
      optD.classList.toggle("my_selection");
      optionSelected(4);
    }
  });

  // Countdown clock
  let time_left = 15;
  const time_remain = document.getElementById("time_remaining");

  function countDownClock() {
    time_remain.innerText = `${time_left}s`;
    time_left--;

    if (time_left < 0) {
      clearInterval(clock);
      currentIndex = currentIndex + 1;
      displayQuestions(currentIndex);
      time_left = 15;
      time_remain.innerText = `${time_left}s`;
    }
  }

  let clock = setInterval(countDownClock, 1000);

  // Listen for socket connections
  socket.on("update option", (options) => {
    options.forEach((option) => {
      let active_class = "";

      if (option.id == userId) {
        active_class = "my_selection";
        myScore += option.opt == question.ans ? 1 : 0;
        score1.innerText = `${myScore}`;
      } else {
        active_class = "opponent_selection";
        opponentScore += option.opt == question.ans ? 1 : 0;
        score2.innerText = `${opponentScore}`;
      }
      switch (option.opt) {
        case 1:
          optA.classList.add(active_class);
          break;
        case 2:
          optB.classList.add(active_class);
          break;
        case 3:
          optC.classList.add(active_class);
          break;
        case 4:
          optD.classList.add(active_class);
          break;
        default:
          clearActiveSelection();
      }
    });

    // showCorrectAns(question.ans);

    switch (question.ans) {
      case 1:
        optA.classList.add("correct_ans");
        break;
      case 2:
        optB.classList.add("correct_ans");
        break;
      case 3:
        optC.classList.add("correct_ans");
        break;
      case 4:
        optD.classList.add("correct_ans");
        break;
      default:
        clearActiveSelection();
    }

    setTimeout(() => {
      currentIndex = currentIndex + 1;

      if (currentIndex <= questions.length - 1) {
        clearInterval(clock);
        clearActiveSelection();
        time_left = 15;
        time_remain.innerText = `${time_left}s`;
        iSelected = false;
        displayQuestions(currentIndex);
        socket.emit("clear-options");
        clock = setInterval(countDownClock, 1000);
      } else {
        socket.emit("clear-players");
        window.location.href = "./mulresult.html";
      }
    }, "3000");
  });

  socket.on("return_players", (obj) => {
    playerObj = obj;
    let parr = Object.keys(playerObj);
    parr = parr.filter((p) => p != userId);
    opponent = parr[0];
    let finalArr = [];

    finalArr.push({ id: userId, score: myScore });
    finalArr.push({ id: opponent, score: opponentScore });
    console.log("final arr", finalArr);
    socket.emit("update_result", finalArr);
  });
});
