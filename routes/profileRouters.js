const express = require('express')
const router = express.Router();
const {userProfile,updateProfile,saveProfile} = require("../controllers/profileControllers")
const isloggedin = require("../middlewares/isloggedin")

router.get("/",isloggedin, userProfile)
router.get("/update",isloggedin, updateProfile)
router.post("/save",isloggedin, saveProfile)
// router.get("/picture",isloggedin, "")


module.exports = router