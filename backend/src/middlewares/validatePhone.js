const validatePhone = (req, res, next) => {
    const { phone } = req.body;
  
    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }
  
    const phoneRegex = /^09\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }
  
    next(); 
  };
  
  module.exports = validatePhone;
  