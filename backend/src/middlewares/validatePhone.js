const validatePhone = (req, res, next) => {
    console.log(`[validatePhone] Validating phone number:`, req.body.phone);
    const { phone } = req.body;
  
    if (!phone) {
      console.log(`[validatePhone] Validation failed: Phone number is missing`);
      return res.status(400).json({ message: "Phone number is required" });
    }
  
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(phone)) {
      console.log(`[validatePhone] Validation failed: Invalid phone format for ${phone}`);
      return res.status(400).json({ message: "Invalid phone number format" });
    }
  
    console.log(`[validatePhone] Phone number validated successfully:`, phone);
    next(); 
  };
  
  module.exports = validatePhone;
  