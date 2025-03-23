const express = require("express")
const router = express.Router()
const authController = require("./../controller/auth")
const validatePhone = require("../middlewares/validatePhone");
const validateSignUp = require("./../middlewares/validateSignUp")

router.post("/sms/send",validatePhone,authController.sendOTP)
router.post("/sms/verify",authController.verifyOTP)
router.post("/signUp",validateSignUp,authController.signUp)



module.exports = router