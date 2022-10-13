//const button = document.getElementById("clickme");
const button2 = document.getElementById("clicked");


// button.addEventListener("click", () => {
//   console.log("btn click");
//   fetch("/hello")
//     .then((resp) => resp.json())
//     .then((data) => console.log(data));
// });




button2.addEventListener("click", () =>{
  console.log("btn click")
  fetch("/homepage/hello")
  .then((resp) => resp.json())
  .then((data) => console.log(data))
})