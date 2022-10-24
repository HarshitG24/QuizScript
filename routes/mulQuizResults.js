const express = require("express");
const router = express.Router();
const db = require("../database/quizScriptDb");

// Api calls
router.post("/sendQuizResults", async (req, res) => {
  const status = await db.sendMulQuizResult(req?.body || {});
  res.status(status).send();
});

module.exports = router;
