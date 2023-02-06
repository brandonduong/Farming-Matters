const databaseOperations = require("./databaseOperations");
const express = require("express");
const mysql = require("mysql2");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5001;

app.use(express.json());

// connection
let db = mysql.createConnection({
  host: "localhost",
  user: "capstone",
  password: "farming-matters",
  database: "testFarmingMatters",
});

app.post("/", (req, res) => {
  // Create table for user if it does not exist and inserting data
  let userID = "111111";

  //prob dont need to call createusertable here unless there is stuff about creating account on the backend already
  databaseOperations.createUserTable(db, userID);
  databaseOperations.logData(db, userID, JSON.stringify(req.body));
  databaseOperations.deleteUserTable(db, userID);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
