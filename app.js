const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// database
const db = require("./config/database");

// test DB
try {
  db.authenticate();
  console.log("Connection has been established successfully!");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.get("/", (req, res) => res.send("INDEX"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
