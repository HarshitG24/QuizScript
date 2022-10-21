const express = require("express");
const router = express.Router();
const db = require("../database/quizScriptDb.js");

//Api calls

router.get("/", async (req, res) => {
  const data = await db.fetchCategories();

  res.send(JSON.stringify(data));
});

router.post("/createCategories", async (req, res) => {
  const cat = db.createCategories(req?.body || {});
  res.send({ data: "works" });
});

// Api to send questions to mongodb database
router.post("/postQuestions", async (req, res) => {
  const cat = db.createQuestions(req?.body || {});
  res.send({ data: "works" });
});

// Api to get questions from mongodb database for a given category
router.get("/getQuestions/:category", async (req, res) => {
  const cat = await db.getQuestions(req?.params?.category || "");
  console.log("cat is", cat);
  res.send({ code: cat.code, data: cat.data });
});

module.exports = router;
