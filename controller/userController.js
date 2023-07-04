const Company = require("../model/Company");
const User = require("../model/User");
const { validationResult, check } = require("express-validator");
const sequelize = require("../config/dbConfig");

exports.validateGetAllUsers = [
  check("companyId")
    .notEmpty()
    .withMessage("Company Id is required")
    .isInt()
    .withMessage("Company Id must be integer"),
];

exports.getAllUsers = async function (req, res) {
  try {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const companyId = req.body.companyId;

    // association between company and user
    User.belongsTo(Company, { foreignKey: "companyId" });

    // get all users
    const users = await User.findAll({
      attributes: [
        "userId",
        "userName",
        "email",
        "mobile",
        "password",
        "companyId",
        [sequelize.col("company.companyName"), "companyName"],
      ],
      where: {
        companyId: companyId,
      },
      include: {
        model: Company,
        attributes: [],
      },
      raw: true, // to get the data in json format
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json({ message: "Users found", users: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.validateCreateUser = [
  check("userName").notEmpty().withMessage("User Name is required"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is not valid"),
  check("mobile")
    .notEmpty()
    .withMessage("Mobile is required"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters"),
  check("companyId")
    .notEmpty()
    .withMessage("Company Id is required")
    .isInt()
    .withMessage("Company Id must be integer"),
];

exports.createUser = async function (req, res) {
  try {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const { userName, email, mobile, password, companyId } = req.body;

    // create user
    const user = await User.create({
      userName: userName,
      email: email,
      mobile: mobile,
      password: password,
      companyId: companyId,
    });

    if (!user) {
      return res.status(500).json({ message: "Unable to create user" });
    }

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
