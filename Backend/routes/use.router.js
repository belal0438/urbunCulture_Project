const express = require("express");
const UserControllers = require("../controllers/user.controller");
const router = express.Router();

router.post("/user", UserControllers.UserRegister);
router.post("/login", UserControllers.UserLogin);
module.exports = router;
