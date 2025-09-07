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

let users = [];

//routes
app.post("/register", Registervalidate(), validate, (req, res) => {
  console.log("from register");
  let { name, email, password } = req.body;
  console.log(req.body);
  users.push(req.body);

  users.forEach((user) => {
    if (user.email == email) {
      return res.status(400).json({ errors: "Email already Exist" });
    }
  });
  return res.status(201).json(req.body);
});

app.post("/login", Loginvalidate, validate, (req, res) => {
  let { email, password } = req.body;
  let user = users.find((user) => user.email == email);
  if (!user) {
    return res.status(401).json({ errors: "invalid credentials" });
  }
  if (user.password != password) {
    return res.status(401).json({ errors: "invalid credentials" });
  }
  res.status(200).json({ token: "lduldnfd" });
});

//server start
app.listen(3000, () => {
  console.log(`server is listening at http://localhost:3000`);
});
