const router = require('express').Router()
const { registerController, loginController } = require("../controller/auth");




router.post("/register", registerController);
router.get("/login", loginController);


module.exports = router;