const express = require("express");
const router = express.Router();
const db = require("../database/quizScriptDb");

// Api calls
router.post("/sendMulQuizResults", async (req, res) => {
  const status = await db.sendMulQuizResult(req?.body || {});
  res.status(status).send({ status: 200 });
});

router.get("/getMulQuizResults/:username", async (req, res) => {
  const resp = await db.getQuizResult(req?.params?.username || "");
  // const ans = await resp.json();
  console.log("resp", resp);
  res.send({ data: resp.data });
});

module.exports = router;
