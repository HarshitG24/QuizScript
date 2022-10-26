const express = require("express");
const router = express.Router();
const db = require("../database/quizScriptDb.js");

//Api calls

router.get("/:id", async (req, res) => {
  const data = await db.fetchQuestions(req.params.id);
  res.send(JSON.stringify(data));
});

module.exports = router;
