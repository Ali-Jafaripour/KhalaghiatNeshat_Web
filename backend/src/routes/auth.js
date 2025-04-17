const express = require("express")
const router = express.Router()
const authController = require("./../controller/auth")
const validatePhone = require("../middlewares/validatePhone");
const validateSignUp = require("./../middlewares/validateSignUp")
const smsRateLimit = require("./../middlewares/smsRateLimiter ")
const getPhoneToken = require("./../utils/getPhoneToken")
const gameController = require("./../controller/game")


router.post("/sms/send",validatePhone,smsRateLimit,authController.sendOTP)
router.post("/sms/verify",authController.verifyOTP)
router.post("/signUp",validateSignUp,authController.signUp)



module.exports = router