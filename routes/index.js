const express = require("express");
const router = express.Router();
const db = require("../database/quizScriptDb");

// Get Home Page
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

// Api calls
router.post("/login", async (req, res) => {
  const resp = await db.login(req?.body || {});
  res.send({ status: resp });
});

module.exports = router;
