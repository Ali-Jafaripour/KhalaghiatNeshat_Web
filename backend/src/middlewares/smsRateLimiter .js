const OtpModel = require("./../models/otp");

const smsRateLimiter = async (req, res, next) => {
    console.log(`[smsRateLimiter] Checking rate limit for phone:`, req.body.phone);
    
    try {
        const otp = await OtpModel.findOne({ phone: req.body.phone });
        const now = Date.now(); 

        if (!otp || otp.expireAt < now) {
            console.log(`[smsRateLimiter] No rate limit for phone: ${req.body.phone}`);
            return next();
        }

        const remainingTime = Math.ceil((otp.expireAt - now) / 1000);
        console.log(`[smsRateLimiter] Rate limited for phone: ${req.body.phone}, remaining time: ${remainingTime}s`);

        return res.status(429).json({ 
            message: `لطفاً ${remainingTime} ثانیه دیگر دوباره امتحان کنید.`,
            retryAfter: remainingTime 
        });
    } catch (error) {
        console.error(`[smsRateLimiter] Error checking rate limit:`, error);
        return next(); // Proceed despite error to avoid blocking legitimate requests
    }
};

module.exports = smsRateLimiter;
