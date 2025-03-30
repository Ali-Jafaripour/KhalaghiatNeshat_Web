const OtpModel = require("./../models/otp");

const smsRateLimiter = async (req, res, next) => {
    const otp = await OtpModel.findOne({ phone: req.body.phone });
    const now = Date.now(); 

    if (!otp || otp.expireAt < now) {
        return next();
    }

    const remainingTime = Math.ceil((otp.expireAt - now) / 1000);

    return res.status(429).json({ 
        message: `لطفاً ${remainingTime} ثانیه دیگر دوباره امتحان کنید.`,
        retryAfter: remainingTime 
    });
};

module.exports = smsRateLimiter;
