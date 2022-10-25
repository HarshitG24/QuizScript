const express = require("express");
const router = express.Router();
const db = require("../database/quizScriptDb.js");

//Api calls

router.post("/", async (req, res) => {
  console.log("reached");
  
  const data = await db.sendScore(req.body);
  res.send(JSON.stringify(data));
});

module.exports = router;