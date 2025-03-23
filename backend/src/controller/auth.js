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
          user: "u09376717805",
          pass: "Faraz@2005854450111605",
          fromNum: "3000505",
          toNum: req.body.phone,
          patternCode: "fhnywkwtfm3ed2d",
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
    await OtpModel.create({
      phone:req.body.phone,
      code,
      expireAt,
    });
    return res.json({ message: "OTP Code sent successfully :))" });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
