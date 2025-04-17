const jwt = require('jsonwebtoken');

const verifyAuthToken = (req, res, next) => {
  // ابتدا توکن را از کوکی‌ها می‌گیریم
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: "No token provided!" });
  }

  try {
    // بررسی توکن و استخراج داده‌ها
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // شماره موبایل را از توکن استخراج می‌کنیم
    req.phone = decoded.phone; 

    // ادامه‌ی فرآیند به میدل‌ور بعدی یا روت
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token!" });
  }
};

module.exports = verifyAuthToken;
