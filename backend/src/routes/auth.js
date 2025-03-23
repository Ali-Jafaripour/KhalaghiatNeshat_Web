const express = require("express")
const router = express.Router()
const authController = require("./../controller/auth")
router.post("/sms/send",authController.sendOTP)
router.post("/sms/verify",authController.verifyOTP)


module.exports = router