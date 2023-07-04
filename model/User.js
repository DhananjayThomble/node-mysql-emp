const sequelize = require("../config/dbConfig");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "user",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile: DataTypes.STRING,
    password: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
  },
  {
    tableName: "user",
    createdAt: true,
    updatedAt: true,
  }
);

module.exports = User;
