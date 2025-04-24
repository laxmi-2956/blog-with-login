const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./config/db.js");
const authroutes = require("./routes/auth.Routes.js");

const cookieParser = require('cookie-parser')

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());



app.use('/api/users', authroutes);




app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`server is running on ${process.env.PORT}`);
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
});