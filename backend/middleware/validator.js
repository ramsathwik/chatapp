const { body, validationResult } = require("express-validator");
let users = require("../models/users");
let bcrypt = require("bcryptjs");
const Registervalidate = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("email")
      .isEmail()
      .withMessage("invalid Email")
      .custom((value) => {
        let exists = users.find((user) => user.email == value);
        if (exists) {
          throw new Error("email already exists");
        }
        return true;
      }),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be atleast 6 characters"),
  ];
};
const Loginvalidate = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("invalid Email")
      .custom((value) => {
        let user = users.find((user) => user.email == value);
        if (!user) {
          throw new Error("invalid credentials");
        }
        return true;
      }),
    body("password").custom(async (value, { req }) => {
      let user = users.find((user) => user.email == req.body.email);
      const ismatch = await bcrypt.compare(value, user.password);
      if (!ismatch) {
        throw new Error("invalid credentials");
      }
      return true;
    }),
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
