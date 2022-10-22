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
    socket.emit("option-selected", { id: userId, opt, index: currentIndex });
  }

  function clearActiveSelection() {
    if (optA.classList.contains("active")) {
      optA.classList.toggle("active");
    }
    if (optB.classList.contains("active")) {
      optB.classList.toggle("active");
    }
    if (optC.classList.contains("active")) {
      optC.classList.toggle("active");
    }
    if (optD.classList.contains("active")) {
      optD.classList.toggle("active");
    }
  }

  optA.addEventListener("click", () => {
    if (!iSelected) {
      iSelected = true;
      optA.classList.toggle("active");
      optionSelected(1);
    }
  });
  optB.addEventListener("click", () => {
    if (!iSelected) {
      iSelected = true;
      optB.classList.toggle("active");
      optionSelected(2);
    }
  });
  optC.addEventListener("click", () => {
    if (!iSelected) {
      iSelected = true;
      optC.classList.toggle("active");
      optionSelected(3);
    }
  });
  optD.addEventListener("click", () => {
    if (!iSelected) {
      iSelected = true;
      optD.classList.toggle("active");
      optionSelected(4);
    }
  });

  socket.on("update option", (options) => {
    options.forEach((option) => {
      switch (option.opt) {
        case 1:
          // clearActiveSelection();
          optA.classList.add("active");
          break;
        case 2:
          // clearActiveSelection();
          optB.classList.add("active");
          break;
        case 3:
          // clearActiveSelection();
          optC.classList.add("active");
          break;
        case 4:
          // clearActiveSelection();
          optD.classList.add("active");
          break;
        default:
          clearActiveSelection();
      }
      console.log("inside loop");
    });

    setTimeout(() => {
      console.log("I am called");
      clearActiveSelection();
      iSelected = false;
      currentIndex = currentIndex + 1;
      displayQuestions(currentIndex);
      socket.emit("clear-options");
    }, "1000");
  });

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
