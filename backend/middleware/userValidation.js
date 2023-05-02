const { check, validationResult } = require("express-validator");

exports.validateUserSignUp = [
  check("username")
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 3 })
    .withMessage("Username must contain at least 3 characters"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 4 })
    .withMessage(
      "Password must be greater than 4 and contain at least one letter and one number"
    ),
  check("first_name")
    .isLength({ min: 3 })
    .withMessage("First name must contains at least 3 characters"),
  check("last_name")
    .isLength({ min: 3 })
    .withMessage("Last name must contains at least 3 characters"),
  check("age").isInt({ min: 1 }).withMessage("Should be a number greater 0"),
  check("confirmPassword")
    .trim()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Both passwords must be same");
      }
      return true;
    }),
];

exports.userValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  res.json({ success: true, user: req.body });
};
