const card = document.querySelector(".my_project");
//const buttons = document.querySelector(".buttons");
//const img = document.querySelector(".category_image");
//const cat_parent = document.querySelector(".category_parent");
//const cat_details = document.querySelector(".category_details");
//const button = document.querySelector(".create");
const multiplayer = document.getElementById("multiplayer_quiz");

const modal = document.querySelector(".modal");
const trigger = document.querySelector(".trigger");
const closeButton = document.querySelector(".close-button");

const myGameCode = document.getElementById("generated_game_code");
const enteredGameCode = document.getElementById("entered_game_code");

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

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

function change(img,cat_parent,cat_details,buttons) {
  console.log("change called")
  img.style.webkitFilter = "blur(8px)";
  cat_parent.style.webkitFilter = "blur(8px)";
  cat_details.style.webkitFilter = "blur(8px)";
  buttons.style.display = "block";
}
function revert(img,cat_parent,cat_details,buttons) {
  console.log("revert called")
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

multiplayer.addEventListener("click", () => {
  console.log("quiz button clicked");
});

function generateUserGameCode() {
  return Math.floor(1000 + Math.random() * 9000);
}

document.addEventListener("DOMContentLoaded", async () => {
  console.log("reached");
  const resp = await fetch("/categories",{
    method:"get",});
  data = await resp.json()
  const grid = document.querySelector(".project_grid")
  grid.innerHTML = "";
  data.forEach((val) => {
    const my_project = document.createElement("div")
    my_project.className = "my_project"
    
    const image = document.createElement("img");
    const categoryParent = document.createElement("div");
    const categoryDetails = document.createElement("div");
    const buttons  = document.createElement("div");
    const category_name = document.createElement("p");
    const category_description = document.createElement("p");

    let name = val.category_name
    let description = val.category_description
    let img = val.category_image

    categoryParent.className = "category_parent"
    categoryDetails.className = "category_details"
    category_name.className = "category_name"
    category_description.className  = "category_description"
    image.className = "category_image"
    category_name.innerHTML = name
    category_description.innerHTML = description

    image.src = img

    buttons.className = "buttons"
    const list = document.createElement("ul")
    const link1 = document.createElement("li")
    const link2 = document.createElement("li")
    const anch1 = document.createElement("a")
    const anch2 = document.createElement("a")

    anch2.id = "multiplayer_quiz"
    anch2.className = "trigger"
    anch2.innerHTML = "Multiplayer quiz"
    anch1.innerHTML = "Single quiz"

   

    link1.appendChild(anch1)
    link2.appendChild(anch2)

    list.appendChild(link1)
    list.appendChild(link2)
    buttons.appendChild(list)
    categoryParent.appendChild(category_name);
    categoryDetails.appendChild(category_description);
    my_project.appendChild(image)
    my_project.appendChild(categoryParent);
    my_project.appendChild(categoryDetails);
    my_project.appendChild(buttons);
    my_project.onmouseover = function(e){
      change(image,categoryParent,categoryDetails,buttons);
    }
    my_project.onmouseout = function(e) {
      revert(image,categoryParent,categoryDetails,buttons);
    }
    grid.append(my_project)
    
  });
})
