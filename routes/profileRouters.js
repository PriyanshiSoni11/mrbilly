const express = require('express')
const router = express.Router();
const {userProfile} = require("../controllers/profileControllers")
const isloggedin = require("../middlewares/isloggedin")

router.get("/",isloggedin, userProfile)
// router.get("/update",isloggedin, "")
// router.get("/picture",isloggedin, "")


module.exports = router