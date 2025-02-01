const { DataTypes } = require("sequelize");

const sequelize = require("../db/database");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  fullname: DataTypes.STRING,

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  phone: DataTypes.DOUBLE,

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
