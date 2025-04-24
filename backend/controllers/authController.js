    const userModel = require("../models/user.model");
    const jwt = require("jsonwebtoken");
    const bcrypt = require("bcrypt");

    const signup = async (req, res) => {
        const { username, email, password, role } = req.body;
  console.log(req.body);

    if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  if (role) {
    return res.status(403).json({ message: "You cannot set a role" });
  }
  try 
  {
    const isExistingUser = await userModel.findOne({ email });
    if (isExistingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({ message: "Error hashing password" });
      }

      const user = await userModel.create({ username, email, password: hash });

      const { password, ...userData } = user._doc;
      return res.status(201).json({
        message: "User created successfully",
        user: userData,
      });
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
    };

    const login = async (req, res) => {
   
        const { email, password } = req.body;
        if (!email || !password) {
          res.status(400).json({ message: "fill all the blanks" });
        }
        try {
          const isExistuser = await userModel.findOne({ email });
          if (!isExistuser) {
            res.status(400).json({ message: "plese create your accont first" });
          }
          await bcrypt.compare(password, isExistuser.password, (err, result) => {
            if (err) {
              res.status(400).json({ message: "bcrypt error" });
            }
            if (!result) {
              return res.status(400).json({ message: "enter correct password" });
            }
            const { password, ...rest } = isExistuser._doc;
            jwt.sign({ user: rest }, process.env.privateKey, (err, token) => {
              if (err) {
                return res.status(400).json({ message: err.message });
              }
              if (!token) {
                return res.status(400).json({ message: "token is not create" });
              }
      
              console.log(token);
              
              res
                .cookie("verificationtoken", token , {
                  
                })
                .status(200)
                .json({ message: "login sucessfully", user: rest });
            });
          });
        } catch (error) {
          res.status(200).json({message : message?.error});
        }


    };

    module.exports = { signup  , login};