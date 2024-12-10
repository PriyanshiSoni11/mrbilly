const express = require('express')
const router = express.Router();
const {takeOrder,saveOrder, viewOrder,completeOrder,kitchenView,kitchenUpdate,orderHistory} = require("../controllers/orderControllers")
const isloggedin = require("../middlewares/isloggedin");
const orderModel = require('../models/order-model');

router.get("/take/:orderId",isloggedin, takeOrder)
router.post("/save/:orderId",isloggedin, saveOrder)
router.get("/view",isloggedin, viewOrder)
router.post("/complete/:orderId",isloggedin, completeOrder)
router.get("/kitchen",isloggedin, kitchenView)
router.post("/kitchen/update",isloggedin, kitchenUpdate)
router.get("/history",isloggedin, orderHistory)
// router.get("/save/print-kot/:orderId",isloggedin, savePrintKot)
// router.get("/save/print-bill/:orderId",isloggedin, savePrintBill)
// router.get("/save/print-bill-kot/:orderId",isloggedin, savePrintKotBill)



module.exports = router