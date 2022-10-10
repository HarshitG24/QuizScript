const button = document.getElementById("clickme");

button.addEventListener("click", async () => {
  await fetch("/hello")
    .then((response) => response.json())
    .then((data) => console.log(data.name));
});
