const express = require("express");
const router = express.Router();
const db = require("../database/quizScriptDb");

// Api calls
router.post("/sendMulQuizResults", async (req, res) => {
  const status = await db.sendMulQuizResult(req?.body || {});
  res.status(status).send();
});


//single quiz results
router.post("/sendSingleScore",async(req,res) => {
  const status = await db.sendScore(req?.body || {});
  res.send(req.body);
})

router.get("/fetchSingleScore/:user",async(req,res) => {
  const data = await db.fetchSingleScore(req.params.user)
  res.send(JSON.stringify(data))

})

router.get("/getMulQuizResults/:username", async (req, res) => {
  const resp = await db.getQuizResult(req?.params?.username || "");
  // const ans = await resp.json();
  console.log("resp", resp);
  res.send({ data: resp.data });
});

router.get("/fetchMulScore/:user", async (req, res) => {
  const resp = await db.fetchMulScore(req?.params?.user || "");
  // const ans = await resp.json();
  console.log("resp", resp);
  res.send( JSON.stringify(resp));
});

module.exports = router;
