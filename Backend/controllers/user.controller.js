const sequelize = require("../db/database");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function IsStringInvalid(str) {
  if (str == undefined || str.length === 0) {
    return true;
  } else {
    return false;
  }
}

function generateAccesKey(id, email) {
  return jwt.sign({ userId: id, email }, `${process.env.SECRET_KEY}`);
}

exports.UserRegister = async (req, res, next) => {
  const { fullname, email, phone, password } = req.body;
  const t = await sequelize.transaction();
  try {
    if (
      IsStringInvalid(fullname) ||
      IsStringInvalid(email) ||
      IsStringInvalid(phone) ||
      IsStringInvalid(password)
    ) {
      return res.status(400).json({ Message: "All fields are required" });
    }

    const existUser = await User.findOne({ where: { email } });

    if (existUser) {
      return res.status(400).json({ Message: "User Already Exist" });
    }

    const saltrounds = 10;
    bcrypt.hash(password, saltrounds, async (err, hash) => {
      if (err) {
        console.log(err);
      }
      let Newuserdata = await User.create({
        fullname,
        email,
        phone,
        password: hash,
      });
      await t.commit();
      res.status(201).json({ message: "succesfully created" });
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json(error);
  }
};

exports.UserLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (IsStringInvalid(email) || IsStringInvalid(password)) {
      return res.status(400).json({ Message: "Email or Password is required" });
    }

    const existUser = await User.findOne({ where: { email } });

    if (!existUser) {
      return res.status(404).json({ Message: "User does not exist" });
    }

    await bcrypt.compare(password, existUser.password, (err, result) => {
      if (err) {
        return res
          .status(404)
          .json({ Message: "Email or Password is Incorrect" });
      }
      if (result == true) {
        return res
          .status(201)
          .json({
            success: true,
            message: "User logged in succesfull",
            token: generateAccesKey(existUser.id, existUser.email),
          });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Email or Password is Incorrect" });
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
