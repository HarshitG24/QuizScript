const email = document.getElementById("email");
const password = document.getElementById("password");
const btn = document.getElementById("clickme");

btn.addEventListener("click", async () => {
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
    let resp = await fetch("/login", opts);
    resp = await resp.json();
    if (resp.code == 200) {
      try {
        window.location.replace(
          "http://localhost:3000/categories.html?userID=" + resp.data[0].email
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please check your credentials");
    }
  } catch (error) {
    console.log(error);
  }
});
