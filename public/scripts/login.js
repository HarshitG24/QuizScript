const button = document.getElementById("clickme");

button.addEventListener("click", () => {
  console.log("btn click");
  fetch("/hello")
    .then((resp) => resp.json())
    .then((data) => console.log(data));
});
