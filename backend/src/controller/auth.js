const request = require("request");
const OtpModel = require("./../models/otp");
const usersModel = require("./../models/users");
const jwt = require("jsonwebtoken")
module.exports.sendOTP = async (req, res) => {
  console.log('[sendOTP] Generating OTP for phone:', req.body.phone);
  const code = Math.floor(10000 + Math.random() * 90000);

  const now = new Date();
  const expireAt = now.getTime() + 120_000;
  try {
    console.log(`[sendOTP] Generated code: ${code}, expiry: ${new Date(expireAt)}`);
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
          console.log("[sendOTP] OTP sent successfully to:", req.body.phone);
        } else {
          console.error("[sendOTP] Failed to send OTP:", error || body);
        }
      }
    );
    console.log(`[sendOTP] Updating OTP record for phone: ${req.body.phone}`);
    await OtpModel.findOneAndUpdate(
      { phone: req.body.phone },
      { code, expireAt, uses: 0 },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log(`[sendOTP] OTP record updated successfully for: ${req.body.phone}`);
    return res.json({ message: "OTP Code sent successfully :))" });
  } catch (err) {
    console.error("[sendOTP] Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.verifyOTP = async (req, res) => {
  console.log(`[verifyOTP] Verifying OTP - Phone: ${req.body.phoneNumber}, Code: ${req.body.code}`);
  
  try {
    const otp = await OtpModel.findOneAndUpdate(
      {phone: req.body.phoneNumber,},
      {
        $inc:{
          uses:1
        }
      });
    
    console.log(`[verifyOTP] OTP record found:`, otp ? `ExpireAt: ${otp.expireAt}, Uses: ${otp.uses}` : 'No record found');
    
    if (otp) {
      const date = new Date();
      const now = date.getTime();
      if (otp.expireAt < now) {
        console.log(`[verifyOTP] Code expired for phone: ${req.body.phoneNumber}`);
        return res.status(410).json({ message: "Code is expired !!" });
      }
      else if (otp.uses > 4) {
        console.log(`[verifyOTP] Max uses exceeded for phone: ${req.body.phoneNumber}`);
        return res.status(408).json({ message: "Code is max use !!" });
      }
      else if (otp.code != req.body.code) {
        console.log(`[verifyOTP] Incorrect code for phone: ${req.body.phoneNumber}`);
        return res.status(409).json({ message: "Code is not correct !!" });
      }
      else{
        console.log(`[verifyOTP] OTP verified successfully for phone: ${req.body.phoneNumber}`);
        const token = jwt.sign(
          { phone: otp.phone },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        console.log(`[verifyOTP] JWT token generated for phone: ${req.body.phoneNumber}`);
        res.cookie("authToken", token, {
          httpOnly: true,  
          secure: false, 
          maxAge: 60 * 60 * 1000, 
          sameSite: "strict" 
        });
        console.log(`[verifyOTP] Cookie set for phone: ${req.body.phoneNumber}`);
        return res.status(200).json({ message: "Code is correct :))" });
      }
    }
    else{
      console.log(`[verifyOTP] No OTP record found for phone: ${req.body.phoneNumber}`);
      return res.status(409).json({ message: "Code is not correct !!" });
    }
  } catch (error) {
    console.error(`[verifyOTP] Error verifying OTP:`, error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports.signUp = async (req, res) => {
  console.log(`[signUp] Signup request for phone: ${req.body.phone}`);
  try {
    const existingUser = await usersModel.findOne({ phone: req.body.phone });
    console.log(`[signUp] Existing user check:`, existingUser ? 'User exists' : 'New user');
    
    if (existingUser) {
      console.log(`[signUp] User already exists with phone: ${req.body.phone}`);
      return res.status(400).json({ message: "User already exists" });
    }
    else{
      console.log(`[signUp] Creating new user with phone: ${req.body.phone}`);
      const user = await usersModel.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        phone:req.body.phone,
        nationalCode:req.body.nationalCode,
        email:req.body.email,
        gender:req.body.gender,
        stuNumber:req.body.stuNumber,
      });
      console.log(`[signUp] User created successfully with ID: ${user._id}`);
      // Store user id in session
      req.session.userId = user._id;
      console.log(`[signUp] User ID stored in session: ${user._id}`);
      return res.status(201).json({ message: "User registered successfully", userId: user._id });
    }
  } catch (error) {
    console.error(`[signUp] Error during signup:`, error);
    return res.status(500).json({ message: "Server error" });
  }
}
