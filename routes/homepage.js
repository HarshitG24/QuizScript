const express = require("express");
const router = express.Router();
const db = require("../database/quizScriptDb");


router.get("/", (req, res) => {
  res.render("home", { title: "Express" });
});

// Api calls
router.get("/hello", async (req, res) => {
  const resp = await db.testData({ test: "test 1" });
  res.send({ status: resp });
});

module.exports = router;