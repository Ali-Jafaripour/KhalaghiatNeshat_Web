const express = require("express")
const router = express.Router()
const gameController = require("./../controller/game")

router.get("/getTeamName",gameController.getTeamName)

module.exports = router
