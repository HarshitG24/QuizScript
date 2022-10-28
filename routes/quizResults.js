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
module.exports = router;
