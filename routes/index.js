const express = require("express");
const router = express.Router();

// Get Home Page
router.get("/", function (req, res) {
  res.render("index", { title: "Express" });
});

// Api calls
router.get("/hello", (req, res) => {
  res.send({ name: "Hello Mihir" });
});

module.exports = router;
