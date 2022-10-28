const express = require("express");
const router = express.Router();
const db = require("../database/quizScriptDb");

// Api calls
router.post("/createUser", async (req, res) => {
  const status = await db.createUser(req?.body || {});
  res.status(status).send();
});

router.delete("/deleteUser/:user", async (req, res) => {
  const status = await db.deleteUser(req?.params?.user || {});
  res.status(status).send({ code: status });
});

module.exports = router;
