const { Sequelize } = require("sequelize");
require("dotenv").config();

console.log("DB_DATABASE: ", process.env.DB_DATABASE);

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

module.exports = sequelize;