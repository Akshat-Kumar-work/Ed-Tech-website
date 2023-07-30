// Import the required modules
const express = require("express")
const router = express.Router()


//importing controllers
const { capturePayment , verifyPayment} = require("../controllers/payments")

//importing middlewares
const { auth,  isStudent } = require("../middlewares/auth");


//routes

//to capture payment or to create order
router.post("/capturePayment",auth , isStudent , capturePayment);

//to verify signature after student paid , and to give them course
router.post("/verifySignature",verifyPayment);

module.exports = router;
