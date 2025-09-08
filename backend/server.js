//built-in modules
const express = require("express");
const app = express();
const cors = require("cors");
let mongoose = require("mongoose");

//Routers
let Authrouter = require("./routes/AuthRouter");

//built-in middlwares
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

//routes
app.use("/", Authrouter);

//server start
mongoose
  .connect("mongodb+srv://user:user@cluster0.70kvqx3.mongodb.net/chatapp")
  .then(() => {
    console.log("successfully connected to database");
    app.listen(3000, () => {
      console.log(`server is listening at http://localhost:3000`);
    });
  })
  .catch((err) => {
    console.log("error connecting to database");
  });
