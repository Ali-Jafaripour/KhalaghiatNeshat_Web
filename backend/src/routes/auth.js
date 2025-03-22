const express = require("express")
const router = express.Router()
const authController = require("./../controller/auth")
router.post("/sms/send",authController.sendOTP)

module.exports = router