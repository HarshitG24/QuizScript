document.addEventListener("DOMContentLoaded", () => {
  let options = [];
  const socket = io("http://localhost:3000");

  const optA = document.getElementById("optA");
  const optB = document.getElementById("optB");
  const optC = document.getElementById("optC");
  const optD = document.getElementById("optD");

  function optionSelected(opt) {
    socket.emit("option-selected", opt);
  }

  function clearActiveSelection() {
    if (optA.classList.contains("active")) {
      optA.classList.toggle("active");
    } else if (optB.classList.contains("active")) {
      optB.classList.toggle("active");
    } else if (optC.classList.contains("active")) {
      optC.classList.toggle("active");
    } else if (optD.classList.contains("active")) {
      optD.classList.toggle("active");
    }
  }

  optA.addEventListener("click", () => {
    optionSelected(1);
  });
  optB.addEventListener("click", () => {
    optionSelected(2);
  });
  optC.addEventListener("click", () => {
    optionSelected(3);
  });
  optD.addEventListener("click", () => {
    optionSelected(4);
  });

  socket.on("update option", (option) => {
    switch (option) {
      case 1:
        clearActiveSelection();
        optA.classList.add("active");
        break;
      case 2:
        clearActiveSelection();
        optB.classList.add("active");
        break;
      case 3:
        clearActiveSelection();
        optC.classList.add("active");
        break;
      case 4:
        clearActiveSelection();
        optD.classList.add("active");
        break;
      default:
        clearActiveSelection();
    }
  });
});
