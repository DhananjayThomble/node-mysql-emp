const Company = require("../model/Company");
const { validationResult, check } = require("express-validator");
const sequelize = require("../config/dbConfig");

exports.getAllCompanies = async function (req, res) {
  try {
    const companies = await Company.findAll({
      attributes: ["companyId", "companyName"],
      raw: true,
    });

    if (companies.length === 0) {
      return res.status(404).json({ message: "No companies found" });
    }

    res.status(200).json({ message: "companies found", companies: companies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// create company
exports.validateCreateCompany = [
  check("companyName").notEmpty().withMessage("Company Name is required"),
];

exports.createCompany = async function (req, res) {
  try {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const companyName = req.body.companyName;

    // create company
    const company = await Company.create({
      companyName: companyName,
    });

    res
      .status(201)
      .json({ message: "Company created successfully", company: company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
