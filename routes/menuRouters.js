const express = require('express')
const router = express.Router();
const {addMenu,saveMenu,selectMenu} = require("../controllers/menuControllers")
const isloggedin = require("../middlewares/isloggedin")

router.get("/add",isloggedin, addMenu)
router.post("/save",isloggedin, saveMenu)
//router.post("/select",isloggedin, selectMenu)

module.exports = router