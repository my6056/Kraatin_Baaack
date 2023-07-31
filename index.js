/*______________________________________Importing start _____________________________________________________________________*/
const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { connectDB } = require("./config/Database");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const cors = require("cors");
const PORT = process.env.PORT || 5010;

/*______________________________________Importing end_____________________________________________________________________*/
// app initilize
const app = express();

/* _____________________________________MIDDLEWARE Start ______________________________________________*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
// Add a middleware to explicitly allow the required headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.FRONT_END_HOME_URL);
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

/* _____________________________________MIDDLEWARE END ______________________________________________*/

/* _____________________________________ROUTE Start ______________________________________________*/

app.use("/", require("./routers"));
app.get("*", (req, res) => {
  return res.send("Router Not Found");
});
/* _____________________________________ROUTE Start ______________________________________________*/

// server start with db
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server Running In The Port : ${PORT}`);
  });
});
