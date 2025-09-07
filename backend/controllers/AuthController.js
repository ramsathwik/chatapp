//built-in
let bcrypt = require("bcryptjs");

//models
let users = require("../models/users");

let Registercontroller = async (req, res) => {
  let password = req.body.password;
  req.body.password = await bcrypt.hash(password, 10);
  users.push(req.body);
  console.log(users);
  return res.status(201).json({ token: "dljdllfgj", user: req.body });
};

let Logincontroller = (req, res) => {
  let user = users.find((user) => user.email == req.body.email);
  res.status(200).json({ token: "lduldnfd", user });
};

module.exports = { Registercontroller, Logincontroller };
