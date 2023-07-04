const express = require("express");
const app = express();
require("dotenv").config();
const userRoute = require("./route/userRoute");
const companyRoute = require("./route/companyRoute");
const sequelize = require("./config/dbConfig");

const port = process.env.PORT || 8080;

app.use(express.json()); // for parsing application/json

// Sequelize connection
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
};
connectToDatabase().then(() => {
  // Sync: It is used to create the table in the database. It will create the table only if it does not exist.
  // if any changes are made to the model, it will update the table.
  sequelize.sync().then(() => {
    console.log("tables created successfully");
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
