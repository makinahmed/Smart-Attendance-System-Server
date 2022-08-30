const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require("bcryptjs");


// register 

const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid Data" });
  }
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }
    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;
    await user.save();

    return res.status(201).json({ message: "Registration Success", user });
  } catch (e) {
    next(e);
  }
};

// login


const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invaid Credential" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invaid Credential" });
    }
    const token = jwt.sign(user._doc, "secret-key", { expiresIn: "30s" });

    return res.status(200).json({ message: "Login Success", token });
  } catch (e) {
    next(e);
  }
};


module.exports = {
    loginController,
    registerController
}





/*
============= JWT TOKEN ==========================


1. Check is authorization is defined or undefined
2. If undefined then return error;
3. get the token
4. verify the token
5. find user by id ( compare with token id and user id)
6. return 200 or 401 (base on user is found or not)

 */
