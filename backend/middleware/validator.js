const { body, validationResult } = require("express-validator");
const Registervalidate = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be atleast 6 characters"),
  ];
};
const Loginvalidate = () => {
  return [
    body("email").notEmpty().withMessage("invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be atleast 6 characters"),
  ];
};

const validate = (req, res, next) => {
  console.log("from validate");
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
module.exports = { Registervalidate, Loginvalidate, validate };
