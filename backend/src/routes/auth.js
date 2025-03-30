const express = require("express")
const router = express.Router()
const authController = require("./../controller/auth")
const validatePhone = require("../middlewares/validatePhone");
const validateSignUp = require("./../middlewares/validateSignUp")
const smsRateLimit = require("./../middlewares/smsRateLimiter ")


router.post("/sms/send",validatePhone,smsRateLimit,authController.sendOTP)
router.post("/sms/verify",authController.verifyOTP)
router.post("/signUp",validateSignUp,authController.signUp)



module.exports = router