const express = require('express')
const router = express.Router();
const {addCategory,saveCategory,selectCategory,editCategory,updateCategory} = require("../controllers/categoryControllers")
const isloggedin = require("../middlewares/isloggedin")

router.get("/add",isloggedin, addCategory)
router.post("/save",isloggedin, saveCategory)
router.post("/select",isloggedin, selectCategory)
router.get("/edit/:categoryId",isloggedin, editCategory)
router.post("/update/:categoryId",isloggedin, updateCategory)

module.exports = router