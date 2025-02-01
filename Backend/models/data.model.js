const { DataTypes } = require("sequelize");

const sequelize = require("../db/database");

const Data = sequelize.define("data", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  amount: DataTypes.DOUBLE,
  descript: DataTypes.STRING,
});

module.exports = Data;
