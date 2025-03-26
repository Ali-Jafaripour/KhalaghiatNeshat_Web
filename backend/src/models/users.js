const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  stuNumber: {
    type: String,
    required: true,
  },
  nationalCode: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: { 
    type: String, 
    enum: ["male", "female"], 
    required: true 
  }
});

module.exports = mongoose.model("User", schema);
