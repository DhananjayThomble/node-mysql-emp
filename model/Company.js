const sequelize = require("../config/dbConfig");
const { DataTypes } = require("sequelize");

const Company = sequelize.define(
  "company",
  {
    companyId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    companyName: DataTypes.STRING,
  },
  {
    tableName: "company",
    createdAt: true,
    updatedAt: true,
  }
);

// Model End

module.exports = Company;
