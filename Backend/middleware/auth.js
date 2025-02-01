const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

exports.Authenticate = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    // console.log("token>>>", token);
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized request" });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const Userdata = await User.findOne({
      where: { email: decodedToken.email },
    });
    req.user = Userdata;
    next();
  } catch (err) {
    // console.log(err)
    return res
      .status(401)
      .json({ success: false, message: "User doesnot Exist" });
  }
};
