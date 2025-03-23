const mongoose  = require("mongoose");
const schema = new mongoose.Schema({
    code:{
        type:Number,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    expireAt:{
        type:Number,
        required:true,
    },
    uses:{
        type:Number,
        default:0,
    },
});
module.exports = mongoose.model("OTP",schema)
