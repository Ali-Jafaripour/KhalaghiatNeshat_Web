const { body, validationResult } = require("express-validator");

const validateSignUp = [
  body("name")
    .notEmpty()
    .withMessage("Full name is required")
    .custom((value, { req }) => {
      console.log(`[validateSignUp] Validating fullName: ${value}`);
      const fullName = value.trim().split(/\s+/);
      if (fullName.length < 2) {
        console.log(`[validateSignUp] Invalid fullName: Must include first and last name`);
        throw new Error("Full name must include at least first and last name");
      }
      req.body.firstName = fullName[0];
      req.body.lastName = fullName.slice(1).join(" ");
      console.log(`[validateSignUp] Parsed firstName: ${req.body.firstName}, lastName: ${req.body.lastName}`);
      return true;
    }),


  body("nationalId")
    .isLength({ min: 10, max: 10 })
    .withMessage("National code must be 10 digits")
    .custom((value) => {
      console.log(`[validateSignUp] Validating nationalCode: ${value}`);
      return true;
    }),

  body("email").isEmail()
    .withMessage("Invalid email format")
    .custom((value) => {
      console.log(`[validateSignUp] Validating email: ${value}`);
      return true;
    }),

  body("sex").isIn(["male", "female"])
    .withMessage("Invalid gender")
    .custom((value) => {
      console.log(`[validateSignUp] Validating gender: ${value}`);
      return true;
    }),

  body("studentId").isLength({ min: 8, max: 8 })
    .withMessage("Student number must be 8 digits")
    .custom((value) => {
      console.log(`[validateSignUp] Validating stuNumber: ${value}`);
      return true;
    }),

  (req, res, next) => {
    console.log(`[validateSignUp] Running validation for signup request`);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(`[validateSignUp] Validation errors:`, errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(`[validateSignUp] Validation successful for signup request`);
    next();
  },
];

module.exports = validateSignUp;
