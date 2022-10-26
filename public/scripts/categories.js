const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");

const myGameCode = document.getElementById("generated_game_code");
const enteredGameCode = document.getElementById("entered_game_code");

// To fetch the USERID from the url
const query = window.location.search.substring(1);
const array = query.split("=");
const userID = array[1];

function toggleModal() {
  modal.classList.toggle("show-modal");
  if (modal.classList.contains("show-modal")) {
    myGameCode.innerText = `${generateUserGameCode()}`;
  }
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}
function socketCall(name) {
  const socket = io("http://localhost:3000");
  socket.emit("new player", myGameCode);

  socket.on("update-game", (players) => {
    let me = socket.id;

    let hasGameStarted = () => {
      return players.find((player) => player.active == true);
    };

    if (hasGameStarted()) {
      let active = players.find((player) => player.active == true);
    }
    if (players.length == 2) {
      start_game.href =
        "./mulquiz.html?userID=" + userID + "&categories=" + name;
      start_game.click();
    }
  });
}
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

function change(img, cat_parent, cat_details, buttons) {
  img.style.webkitFilter = "blur(8px)";
  cat_parent.style.webkitFilter = "blur(8px)";
  cat_details.style.webkitFilter = "blur(8px)";
  buttons.style.display = "block";
}
function revert(img, cat_parent, cat_details, buttons) {
  img.style.webkitFilter = "none";
  cat_parent.style.webkitFilter = "none";
  cat_details.style.webkitFilter = "none";
  buttons.style.display = "none";
}

// button.addEventListener("click", async () => {
//   let categories = {
//     category_name: "",
//     category_data: "",
//   };

//   const headers = new Headers({ "Content-Type": "application/json" });
//   const opts = {
//     method: "post",
//     headers: headers,
//     body: JSON.stringify(categories),
//   };

//   const resp = await fetch("/categories/createCategories", opts);
// });

function generateUserGameCode() {
  return Math.floor(1000 + Math.random() * 9000);
}

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".container");
  const resp = await fetch("/categories", {
    method: "get",
  });
  data = await resp.json();
  const grid = document.createElement("div");
  //const grid = document.querySelector(".project_grid project_grid--1x3")
  grid.className = ".project_grid project_grid--1x3";
  data.forEach((val) => {
    // categories grid display
    const my_project = document.createElement("div");
    my_project.className = "my_project";

    const image = document.createElement("img");
    const categoryParent = document.createElement("div");
    const categoryDetails = document.createElement("div");
    const buttons = document.createElement("div");
    const category_name = document.createElement("p");
    const category_description = document.createElement("p");

    let name = val.category_name;
    let description = val.category_description;
    let img = val.category_image;

    categoryParent.className = "category_parent";
    categoryDetails.className = "category_details";
    category_name.className = "category_name";
    category_description.className = "category_description";
    image.className = "category_image";
    category_name.innerHTML = name;
    category_description.innerHTML = description;

    image.src = img;

    buttons.className = "buttons";
    const list = document.createElement("ul");
    const link1 = document.createElement("li");
    const link2 = document.createElement("li");
    const anch1 = document.createElement("a");
    const anch2 = document.createElement("a");

    anch2.id = "multiplayer_quiz";
    anch2.className = "trigger";
    anch2.innerText = "Multiplayer quiz";
    anch1.innerText = "Single quiz";

    anch1.onclick = function (e) {
      window.location.href = "singlequiz.html?categories=" + name;
    };
    anch2.onclick = function (e) {
      toggleModal();
      socketCall(name);
    };

    link1.appendChild(anch1);
    link2.appendChild(anch2);

    list.appendChild(link1);
    list.appendChild(link2);
    buttons.appendChild(list);
    categoryParent.appendChild(category_name);
    categoryDetails.appendChild(category_description);
    my_project.appendChild(image);
    my_project.appendChild(categoryParent);
    my_project.appendChild(categoryDetails);
    my_project.appendChild(buttons);
    my_project.onmouseover = function (e) {
      change(image, categoryParent, categoryDetails, buttons);
    };
    my_project.onmouseout = function (e) {
      revert(image, categoryParent, categoryDetails, buttons);
    };
    // appending to the grid
    grid.append(my_project);
  });
  // pop up for quiz page
  container.append(grid);
});
