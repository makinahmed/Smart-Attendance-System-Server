const jwt = require('jsonwebtoken');
const User = require('./../models/User');

async function authenticate(req, res, next) {
  try {
    const authorizationToken = req.headers.authorization;
    if (!authorizationToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const bearerToken = authorizationToken.split(" ")[1];
    const decodedUser = jwt.verify(bearerToken, "secret-key");
    const user = await User.findById(decodedUser._id);

    if (!user) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid Token" });
  }
}
module.exports = authenticate;