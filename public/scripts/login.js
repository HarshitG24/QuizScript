const email = document.getElementById("email");
const password = document.getElementById("password");
const btn = document.getElementById("clickme");

btn.addEventListener("click", async () => {
  console.log("login btn ");
  let user = {
    email: email?.value || "",
    password: password?.value || "",
  };

  email.value = "";
  password.value = "";

  const headers = new Headers({ "Content-Type": "application/json" });

  const opts = {
    method: "post",
    headers: headers,
    body: JSON.stringify(user),
  };

  try {
    const resp = await fetch("/login", opts);
    if (resp.status == 200 && resp.statusText == "OK") {
      // alert("Successfully logged in");
      window.location.replace("/categories.html");
    } else {
      alert("Please check your credentials");
    }
  } catch (error) {
    console.log(error);
  }
});
