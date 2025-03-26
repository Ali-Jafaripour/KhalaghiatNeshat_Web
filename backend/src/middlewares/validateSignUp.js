const { body, validationResult } = require("express-validator");

const validateSignUp = [
  body("fullName")
    .notEmpty()
    .withMessage("Full name is required")
    .custom((value, { req }) => {
      const fullName = value.trim().split(/\s+/);
      if (fullName.length < 2) {
        throw new Error("Full name must include at least first and last name");
      }
      req.body.firstName = fullName[0];
      req.body.lastName = fullName.slice(1).join(" ");
      return true;
    }),

  body("phone")
    .matches(/^09\d{9}$/)
    .withMessage("Invalid phone number"),

  body("nationalCode")
    .isLength({ min: 10, max: 10 })
    .withMessage("National code must be 10 digits"),

  body("email").isEmail().withMessage("Invalid email format"),

  body("gender").isIn(["male", "female"]).withMessage("Invalid gender"),

  body("stuNumber").isLength({ min: 8, max: 8 }).withMessage("Student number must be 8 digits"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateSignUp;
