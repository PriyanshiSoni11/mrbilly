const express = require('express')
const router = express.Router();
const {login,register,registerUser,loginUser,logoutUser,userHome} = require("../controllers/authControllers")
const isloggedin = require("../middlewares/isloggedin")

router.get("/", login)
router.post("/login", loginUser)
router.get("/logout", logoutUser)
router.get("/register", register)
router.post("/register", registerUser)
router.get("/home",isloggedin, userHome)

module.exports = router