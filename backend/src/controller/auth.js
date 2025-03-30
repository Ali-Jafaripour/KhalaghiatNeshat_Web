const request = require("request");
const OtpModel = require("./../models/otp");
const usersModel = require("./../models/users");
const jwt = require("jsonwebtoken")
module.exports.sendOTP = async (req, res) => {
  const code = Math.floor(10000 + Math.random() * 90000);

  const now = new Date();
  const expireAt = now.getTime() + 120_000;
  try {
    request.post(
      {
        url: "http://ippanel.com/api/select",
        body: {
          op: "pattern",
          user: process.env.SMS_USERNAME,
          pass: process.env.SMS_PASSWORD,
          fromNum: process.env.SMS_FROM_NUMBER,
          toNum: req.body.phone,
          patternCode: process.env.SMS_PATTERN_CODE,
          inputData: [{ "verification-code": code }],
        },
        json: true,
      },
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log("OTP sent successfully");
        } else {
          console.error("Failed to send OTP:", error || body);
        }
      }
    );
    await OtpModel.findOneAndUpdate(
      { phone: req.body.phone },
      { code, expireAt, uses: 0 },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    return res.json({ message: "OTP Code sent successfully :))" });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.verifyOTP = async (req, res) => {
  console.log(req.body.phoneNumber,req.body.code);
  
  const otp = await OtpModel.findOneAndUpdate(
    {phone: req.body.phoneNumber,},
    {
      $inc:{
        uses:1
      }
    });
    
    if (otp) {

      const date = new Date();
      const now = date.getTime();
      if (otp.expireAt < now) {
        return res.status(410).json({ message: "Code is expired !!" });
      }
      else if (otp.uses > 4) {
        return res.status(408).json({ message: "Code is max use !!" });
      }
      else if (otp.code != req.body.code) {
        return res.status(409).json({ message: "Code is not correct !!" });
      }
      else{
        const token = jwt.sign(
          { phone: otp.phone },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.cookie("authToken", token, {
          httpOnly: true,  
          secure: process.env.NODE_ENV === "production", 
          maxAge: 60 * 60 * 1000, 
          sameSite: "strict" 
        });

      return res.status(200).json({ message: "Code is correct :))" });
      }
    }
    else{
      return res.status(409).json({ message: "Code is not correct !!" });
    }
};

module.exports.signUp = async (req, res) => {
  const existingUser = await usersModel.findOne({ phone: req.body.phone });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  else{
    await usersModel.create({
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      phone:req.body.phone,
      nationalCode:req.body.nationalCode,
      email:req.body.email,
      gender:req.body.gender,
      stuNumber:req.body.stuNumber,
    })
    return res.status(201).json({ message: "User registered successfully" });
  }
}
