const fname = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const createBtn = document.getElementById("create");

createBtn.addEventListener("click", async () => {
  console.log("email is", email?.value);
  let newUser = {
    fullName: fname?.value || "",
    email: email?.value || "",
    password: password?.value || "",
  };

  const headers = new Headers({ "Content-Type": "application/json" });

  const opts = {
    method: "post",
    headers: headers,
    body: JSON.stringify(newUser),
  };

  console.log(opts);

  fetch("/newuser/createUser", opts);
});
