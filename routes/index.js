const express = require("express");
const router = express.Router();
const db = require("../database/quizScriptDb");

// Get Home Page
//Change the render function
//res.redirect(index.html) if user is authenticated
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

// Api calls
router.post("/login", async (req, res) => {
  const resp = await db.login(req?.body || {});
  // res.status(resp.code).send(resp.data);

  if (resp.code == 200) {
    req.session.user = resp.data;
    req.session.save();
  }
  res.send(JSON.stringify(resp));
});

router.get("/currentUser", (req, res) => {
  return res.send(req.session.user);
});

router.get("/logout", (req, res) => {
  req.session.destroy();
});

module.exports = router;
