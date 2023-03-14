const databaseOperations = require("./databaseOperations");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { allowSingleSession } = require("./socket/allowSingleSession");
const { auth } = require("./firebase");
const mysql = require("mysql2/promise");
let db;

const PORT = process.env.PORT || 5001;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

/* Auth */
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
/************************/

// // Temp function for dealy
// function databaseDelay(i) {
//   setTimeout(function () {
//     // Add tasks to do
//   }, 20000);
// }

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
    console.log("db defined");
  }
  res.status(200).send();
});

app.post("/private/actions", (req, res) => {
  let userId = req.body.userId;
  let action = req.body.action;
  // let loggedActions =
  console.log(req.body);

  // Only creates a user table if it does not exist in the database
  databaseOperations.createUserTable(db, userId);

  // Log actions
  databaseOperations.logData(db, userId, JSON.stringify(action));

  res.status(200).send();
});

app.post("/private/saveGame", (req, res) => {
  let userId = req.body.userId;
  let data = req.body.gameData;

  // Only creates a user table if it does not exist in the database
  databaseOperations.saveGame(db, userId, data);

  res.status(200).send();
});

app.get("/private/loadGame", async (req, res) => {
  let userId = req.headers.userid;
  let gameState = await databaseOperations.loadGame(db, userId);
  console.log("gamestate: ", gameState[0][0]);
  console.log("gamestate: ", typeof gameState[0][0]);
  res.json(gameState[0][0]);
});

//app.post('/auth/login', (req, res) => login(req.body.email, req.body.password, res));
//app.post('/auth/createaccount',  (req, res) => createAccount(req.body.email, req.body.password, res));

// Contains logic for validating that a user only has a single session
// TODO: emit event from client on login containing userID, trigger function on login event
var allClients = new Map();
io.on("connection", (socket) => {
  allowSingleSession(socket, allClients);
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
