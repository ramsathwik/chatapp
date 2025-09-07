//built-in modules
const express = require("express");
const app = express();
const cors = require("cors");

//custom middleware
let {
  Registervalidate,
  Loginvalidate,
  validate,
} = require("./middleware/validator");

//built-in middlwares
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

//routes
app.post("/register", Registervalidate(), validate, (req, res) => {
  users.push(req.body);
  console.log(users);
  return res.status(201).json({ token: "dljdllfgj", user: req.body });
});

//models
let users = require("./models/users");

app.post("/login", Loginvalidate(), validate, (req, res) => {
  let user = users.find((user) => user.email == req.body.email);
  res.status(200).json({ token: "lduldnfd", user });
});

//server start
app.listen(3000, () => {
  console.log(`server is listening at http://localhost:3000`);
});
