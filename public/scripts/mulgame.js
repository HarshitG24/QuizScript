document.addEventListener("DOMContentLoaded", async () => {
  let questions = [];
  let iSelected = false;
  let currentIndex = 0;
  const socket = io("http://localhost:3000");

  const optA = document.getElementById("optA");
  const optB = document.getElementById("optB");
  const optC = document.getElementById("optC");
  const optD = document.getElementById("optD");

  const query = window.location.search.substring(1);
  const temp = query.split("&");
  const uid = temp[0].split("=");
  const userId = uid[1];

  const cat = temp[1].split("=");
  const category = cat[1];

  if (category != undefined && category != null && category != "") {
    const resp = await fetch("/questions/" + category);
    questions = await resp.json();
    questions = questions.data;

    console.log(questions);
  }

  function optionSelected(opt) {
    socket.emit("option-selected", { id: userId, opt });
  }

  function clearActiveSelection() {
    // Clear my option
    if (optA.classList.contains("my_selection")) {
      optA.classList.toggle("my_selection");
    }
    if (optB.classList.contains("my_selection")) {
      optB.classList.toggle("my_selection");
    }
    if (optC.classList.contains("my_selection")) {
      optC.classList.toggle("my_selection");
    }
    if (optD.classList.contains("my_selection")) {
      optD.classList.toggle("my_selection");
    }

    // Clear opponent option
    if (optA.classList.contains("opponent_selection")) {
      optA.classList.toggle("opponent_selection");
    }
    if (optB.classList.contains("opponent_selection")) {
      optB.classList.toggle("opponent_selection");
    }
    if (optC.classList.contains("opponent_selection")) {
      optC.classList.toggle("opponent_selection");
    }
    if (optD.classList.contains("opponent_selection")) {
      optD.classList.toggle("opponent_selection");
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

  socket.on("update option", (options) => {
    options.forEach((option) => {
      let active_class =
        option.id == userId ? "my_selection" : "opponent_selection";
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

    setTimeout(() => {
      currentIndex = currentIndex + 1;

      if (currentIndex <= questions.length - 1) {
        clearActiveSelection();
        iSelected = false;
        displayQuestions(currentIndex);
        socket.emit("clear-options");
      } else {
        window.location.href = "./mulresult.html";
      }
    }, "1000");
  });

  function addCSSToOptions(option) {
    let active_class =
      option.id == userId ? "my_selection" : "opponent_selection";
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
  }

  socket.on("update-index", () => {});

  // The login to display options dynamically
  const display_ques = document.getElementById("display_question");
  const optionA = document.getElementById("optionA");
  const optionB = document.getElementById("optionB");
  const optionC = document.getElementById("optionC");
  const optionD = document.getElementById("optionD");

  function displayQuestions(currentIndex) {
    let question = questions[currentIndex];
    display_ques.innerText = question.ques;

    let options = question.options;
    optionA.innerText = "A) " + options[0];
    optionB.innerText = "B) " + options[1];
    optionC.innerText = "C) " + options[2];
    optionD.innerText = "D) " + options[3];
  }

  displayQuestions(currentIndex);
});
