const app = require("./src/app")
const mongoose = require("mongoose")
require("dotenv").config()
(async()=>{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Server connect to DB");
})()
app.listen(process.env.SERVER_PORT,()=> console.log(`Server running on port ${process.env.PORT}`))