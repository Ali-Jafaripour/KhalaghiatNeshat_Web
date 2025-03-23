const express = require("express")
const app = express()
const cors = require("cors")
const authRouter = require("./routes/auth")
app.use(express.json())
app.use(cors())
app.use("/auth",authRouter)
module.exports = app