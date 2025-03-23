const express = require("express")
const router = express.Router()
const authController = require("./../controller/auth")
const validatePhone = require("../middlewares/validatePhone");


router.post("/sms/send",validatePhone,authController.sendOTP)
router.post("/sms/verify",authController.verifyOTP)
router.post("/signUp",authController.signUp)



module.exports = router