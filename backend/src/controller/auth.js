const request = require("request");
const OtpModel = require("./../models/otp");

module.exports.sendOTP = async (req, res) => {
  const code = Math.floor(Math.random() * 99999);
  const now = new Date();
  const expireAt = now.getTime() + 300_000;
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
  const otp = await OtpModel.findOneAndUpdate(
    {phone: req.body.phone,},
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
      return res.status(200).json({ message: "Code is correct :))" });
      }
    }
    else{
      return res.status(409).json({ message: "Code is not correct !!" });
    }
};

module.exports.signUp = async (req, res) => {
  
}
