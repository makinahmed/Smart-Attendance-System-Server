const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const {findUserByProperty,createNewUser} = require('./user')



const registerService =async ({name, email, password}) => {
    console.log(name, email, password)
    let user = await findUserByProperty('email',email)
    if (user) {
        const error = new Error('User already exist');
        error.status = 400;
        throw error;
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return createNewUser({ name, email, password: hash })
}
const loginService = (email, password) => {
    const user = await User.findOne({ email});
    if (!user) {
      return res.status(400).json({ message: "Invaid Credential" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invaid Credential" });
    }
   return jwt.sign(user._doc, "secret-key", { expiresIn: "2h" });
}

module.exports = {
    loginService,
    registerService
}