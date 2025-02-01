const Sequelize = require("sequelize");
const mysql2 = require("mysql2");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER_NAME,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
    dialectModule: mysql2,
  }
);

module.exports = sequelize;
