const express = require("express");
require("dotenv").config();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const pageViewRoutes = require("./routes/pageViewRoutes");
const contactRoutes = require("./routes/contactRoutes");
const cors = require("cors");

const dbConnection = require("./config/db");


const app = express();
const port = 3001; // Choose any port you want

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", pageViewRoutes);
app.use("/api", contactRoutes);

dbConnection.once("open", () => {
  console.log("Connected to database");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
