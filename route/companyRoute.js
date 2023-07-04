const express = require("express");
const router = express.Router();
const companyController = require("../controller/companyController");

// calling the controller

router.get("/get_all_companies", companyController.getAllCompanies);

router.post(
  "/create_company",
  companyController.validateCreateCompany,
  companyController.createCompany
);

module.exports = router;
