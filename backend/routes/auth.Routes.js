const express = require("express");
const { signup, login } = require("../controllers/authController");

const authroutes = express.Router();

authroutes.post("/signup" ,signup)

authroutes.post("/login" ,login)

module.exports = authroutes;