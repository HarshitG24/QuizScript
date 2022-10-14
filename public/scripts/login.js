const button = document.getElementById("clickme");
const email = document.getElementById("email");
const password = document.getElementById("password");

button.addEventListener("click", async () => {
  let user = {
    email: email?.value || "",
    password: password?.value || "",
  };

  email?.value = "";
  password?.value = "";

  const headers = new Headers({ "Content-Type": "application/json" });

  const opts = {
    method: "post",
    headers: headers,
    body: JSON.stringify(user),
  };
  fetch("/login", opts);
});
