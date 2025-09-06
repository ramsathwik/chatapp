//built-in modules
const express = require("express");
const app = express();
const cors = require("cors");

//built-in middlwares
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

let users = [];

//routes
app.post("/register", (req, res) => {
  console.log(req.body);
  users.push(req.body);
  return res.status(201).json(req.body);
});

app.post("/login", (req, res) => {
  let { email, password } = req.body;
  let user = users.find((user) => user.email == email);
  if (!user) {
    return res.status(401).send("invalid credentials");
  }
  if (user.password != password) {
    return res.status(401).send("invalid credentials");
  }
  res.status(200).json({ token: "lduldnfd" });
});

//server start
app.listen(3000, () => {
  console.log(`server is listening at http://localhost:3000`);
});
