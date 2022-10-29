import express from "express";
import db from "../database/quizScriptDb.js";
const router = express.Router();

// Api calls
router.post("/createUser", async (req, res) => {
  const status = await db.createUser(req?.body || {});
  res.status(status).send();
});

router.delete("/deleteUser/:user", async (req, res) => {
  const status = await db.deleteUser(req?.params?.user || {});
  res.status(status).send({ code: status });
});

export default router;
