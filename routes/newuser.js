const express = require("express");
const router = express.Router();
const db = require("../database/quizScriptDb");

// Api calls
router.post("/createUser", async (req, res) => {
  const status = await db.createUser(req?.body || {});
  res.send({ status });
});

module.exports = router;
