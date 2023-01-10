const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5001;

// For allowing access to API from other server than host
app.use(cors());

app.use(express.json());

// maybe?
// app.use(express.urlencoded({ extended: false }));

// connection details
let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: "testFarmingMatters",
});

// connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql connected...");
});

app.post("/", (req, res) => {
  let action = `Action: ${req.body["action"]}`;
  console.log(JSON.stringify(req.body));
  let action_entry = {
    user_id: 1,
    action: JSON.stringify(req.body),
    time: new Date().toLocaleString(),
  };
  let sql = "INSERT INTO LoggedActions SET ?";
  let query = db.query(sql, action_entry, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
  console.log(req.body);
  res.status(200).send();
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
