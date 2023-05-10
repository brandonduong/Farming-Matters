const databaseOperations = require("./databaseOperations");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { allowSingleSession } = require("./socket/allowSingleSession");
const { auth } = require("./firebase");
const mysql = require("mysql2/promise");
require("dotenv").config();
const cors = require("cors");
let db;

const PORT = process.env.PORT || 4001;
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors({ origin: process.env.REMOTE_CLIENT_APP, credentials: true }));


/*********** Authentication ***********/

// Checking auth token for all incoming HTTP requests
function checkAuth(req, res, next) {
  if (req.headers.authtoken) {
    // console.log(req.headers.authtoken);
    auth
      .verifyIdToken(req.headers.authtoken)
      .then(() => {
        next();
      })
      .catch((error) => {
        res.status(403).send("Unauthorized");
      });
  } else {
    res.status(403).send("Unauthorized");
  }
}
app.use("/private", checkAuth);

// Validating that a user only has a single session
var allClients = new Map();
const io = new Server(server); // Serverside socket object

io.on("connection", (socket) => {
  allowSingleSession(socket, allClients);
});

/************ SQL Database Endpoints ************/

// Initialize a database connection
app.get("/private/connectToDatabase", async (req, res) => {
  try {
    db = await mysql.createConnection({
      host: "localhost",
      user: "capstone",
      password: "farming-matters",
      database: "testFarmingMatters",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }

  if (db) {
    let userId = req.headers.userid;
    // Only creates a user table if it does not exist in the database
    await databaseOperations.createUserTable(db, userId);
  }
  res.status(200).send();
});

// Store user actions in the database
app.post("/private/logactions", async (req, res) => {
  let userId = req.body.userId;
  let data = req.body.data;
  console.log("data: ", data);

  // Log actions
  await databaseOperations.logData(db, userId, JSON.stringify(data));

  res.status(200).send();
});

// Save a game state in the database
app.post("/private/saveGame", async (req, res) => {
  let userId = req.body.userId;
  let gameState = req.body.gameData;

  // Only creates a user table if it does not exist in the database
  await databaseOperations.saveGame(db, userId, gameState);

  res.status(200).send();
});

// Retrieve a game state from the database
app.get("/private/loadGame", async (req, res) => {
  let userId = req.headers.userid;
  let gameState = await databaseOperations.loadGame(db, userId);
  if (!gameState) {
    res.json();
  } else {
    console.log("gamestate: ", gameState);
    res.json(gameState[0][0]);
  }
});

// Deletes all stored data related to a user
app.delete("/private/deleteUserTable", async (req, res) => {
  let userId = req.headers.userid;
  await databaseOperations.deleteUserTable(db, userId);
  res.status(200).send();
});

// Deletes a user's save game data (not saved actions/research data)
app.delete("/private/deleteGame", async (req, res) => {
  let userId = req.headers.userid;
  await databaseOperations.deleteGame(db, userId);
  res.status(200).send();
});


server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
