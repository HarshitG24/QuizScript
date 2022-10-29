import express from "express";
import db from "../database/quizScriptDb.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", { title: "Express" });
});

// Api calls
router.get("/hello", async (req, res) => {
  const resp = await db.testData({ test: "test 1" });
  res.send({ status: resp });
});

export default router;
