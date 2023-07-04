const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// calling the controller

router.get(
  "/get_all_users",
  userController.validateGetAllUsers,
  userController.getAllUsers
);

router.post(
  "/create_user",
  userController.validateCreateUser,
  userController.createUser
);

module.exports = router;
