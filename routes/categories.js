const express = require("express");
const router = express.Router();
const db = require("../database/quizScriptDb.js");

//Api calls
router.post("/createCategories", async (req, res) => {
  const cat = db.createCategories(req?.body || {});
  res.send({ data: "works" });
});

// Api to send questions to mongodb database
router.post("/postQuestions", async (req, res) => {
  const cat = db.createQuestions(req?.body || {});
  res.send({ data: "works" });
});

module.exports = router;
