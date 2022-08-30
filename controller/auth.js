const {loginService,registerService} = require('../service/auth')

// register 

const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Invalid Data" });
  }
  try {
    const user = await registerService({name,email,password})
     return res.status(201).json({ message: "User Created Successfully", user });
  } catch (e) {
    next(e);
  }
};

// login


const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await loginService({ email, password });
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
