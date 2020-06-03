const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// database
const db = require("./server/config/database");

// test DB
try {
  db.authenticate();
  console.log("Connection has been established successfully!");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// Log requests to the console.
app.use(logger("dev"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("INDEX"));

app.use("/patients", require("./server/routes/patients"));
app.use("/genders", require("./server/routes/genders"));
app.use("/occupations", require("./server/routes/occupations"));
app.use("/regions", require("./server/routes/regions"));
app.use("/hospitals", require("./server/routes/hospitals"));
app.use("/", require("./server/routes/healthStatus"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
