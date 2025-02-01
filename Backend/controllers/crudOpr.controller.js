const sequelize = require("../db/database");
const User = require("../models/user.model");
const Data = require("../models/data.model");

function IsStringInvalid(str) {
  if (str == undefined || str.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.UserData = async (req, res, next) => {
  const { amount, descript } = req.body;
  const t = await sequelize.transaction();
  try {
    if (IsStringInvalid(amount) || IsStringInvalid(descript)) {
      return res
        .status(400)
        .json({ Message: "Amount or Description are required" });
    }

    let data = await Data.create({
      amount,
      descript,
      userId: req.user.id,
    });
    await t.commit();
    res.status(201).json({ sucesses: true, data });
  } catch (error) {
    await t.rollback();
    res.status(500).json(error);
  }
};

exports.updateData = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const dataID = req.params.dataID;
    const { amount, descript } = req.body;

    if (IsStringInvalid(amount) || IsStringInvalid(descript)) {
      return res
        .status(400)
        .json({ Message: "Amount or Description are required" });
    }

    const existData = await Data.findOne({ where: { id: dataID } });
    if (!existData) {
      return res.status(404).json({ Message: "Data does not exist" });
    }

    await Data.update(
      { amount, descript },
      {
        where: {
          id: dataID,
        },
      }
    );

    await t.commit();
    res
      .status(201)
      .json({ sucesses: true, message: "Data Updated Succesfully" });
  } catch (error) {
    // console.log(error);
    await t.rollback();
    res.status(500).json({ error });
  }
};

exports.deleteData = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const dataID = req.params.dataID;

    const existData = await Data.findOne({ where: { id: dataID } });
    if (!existData) {
      return res.status(404).json({ Message: "Data does not exist" });
    }

    await Data.destroy({
      where: { id: dataID },
    });
    await t.commit();
    res
      .status(201)
      .json({ sucesses: true, message: "Data Delete Succesfully" });
  } catch (error) {
    console.log(error);
    await t.rollback();
    res.status(500).json({ error });
  }
};

exports.getAllData = async (req, res, next) => {
  try {
    const AllData = await Data.findAll();
    res.status(201).json({ sucesses: true, data: AllData });
  } catch (error) {
    res.status(500).json(error);
  }
};
