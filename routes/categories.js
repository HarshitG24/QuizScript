const express = require("express");
const router = express.Router()
const db = require("../database/quizScriptDb.js")



//Api calls

router.get("/",async(req,res) => {
    const data = await db.fetchCategories();
    console.log(data);
    res.render(
        "categories",{data: data}
    )
})
router.post("/createCategories", async(req,res)=> {
    const cat = db.createCategories(req?.body || {})
    res.send({data: "works"})
});

module.exports = router;