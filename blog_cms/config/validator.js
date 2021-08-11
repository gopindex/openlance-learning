const { check } = require("express-validator");

const validateAuthRegister = [
  check("name")
    .notEmpty()
    .withMessage("The name shouldn't be empty string")
    .isString()
    .withMessage("The name must be string")
    .isLength({ min: 5 })
    .withMessage("The name should be atleast 5 chars long"),
  check("email")
    .isEmail()
    .withMessage("The valid email is required")
    .normalizeEmail(),
  check("password")
    .notEmpty()
    .withMessage("The password shouldn't be empty string")
    .isLength({ min: 8 })
    .withMessage("The password should be atleast 8 chars long")
    .custom((val, { req }) => {
      if (req.body.repeatPassword !== val) {
        throw new Error("The password doesn't match");
      }
      return true;
    }),
];
module.exports = { validateAuthRegister };
