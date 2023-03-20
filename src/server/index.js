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

app.post("/private/logactions", async (req, res) => {
  let userId = req.body.userId;
  let data = req.body.data;
  console.log("data: ", data);

  // Log actions
  await databaseOperations.logData(db, userId, JSON.stringify(data));

  res.status(200).send();
});

app.post("/private/saveGame", async (req, res) => {
  let userId = req.body.userId;
  let data = req.body.gameData;

  // Only creates a user table if it does not exist in the database
  await databaseOperations.saveGame(db, userId, data);

  res.status(200).send();
});

app.get("/private/loadGame", async (req, res) => {
  let userId = req.headers.userid;
  let gameState = await databaseOperations.loadGame(db, userId);
  if (!gameState) {
    console.log("empty gamestate: ", gameState);
    // gameStateInitial = {
    //   user_id: 'PwpSHqTgx3agW9ldnPpwXvzE8Wd2',
    //   turn: 2,
    //   season: 'Fall',
    //   money: 10000,
    //   decision_type: '1',
    //   inventory: '{"Rice":0,"Carrot":0,"Orange":0,"Lettuce":0,"Tomato":0,"Watermelon":0,"Wheat":0,"Pumpkin":0,"Beet":0,"Berries":0,"Mushroom":0,"Wintermelon":0,"Fertilizer":0,"Pesticide":0}',
    //   sell_prices: '{"Rice":99.53890495728959,"Carrot":197.34744228373398,"Orange":148.25914037392022,"Lettuce":147.4463402477227,"Tomato":121.80296834576347,"Watermelon":170.45256410072594,"Wheat":174.77724685806294,"Pumpkin":173.2730706392309,"Beet":174.67291891624566,"Berries":176.044052755136,"Mushroom":174.22785424927028,"Wintermelon":177.24181643735852,"Fertilizer":52.00451116951531,"Pesticide":36.79115837282045}',
    //   insured_crops: '{"Rice":0,"Carrot":0,"Orange":0,"Lettuce":0,"Tomato":0,"Watermelon":0,"Wheat":0,"Pumpkin":0,"Beet":0,"Berries":0,"Mushroom":0,"Wintermelon":0,"Fertilizer":0,"Pesticide":0}',
    //   consultant: 'false,'
    // }
    res.json();
  } else {
    console.log("gamestate: ", gameState);
    res.json(gameState[0][0]);
  }
  // console.log("gamestate: ", gameState[0][0]);
  // console.log("gamestate: ", typeof gameState[0][0]);
});

app.delete("/private/deleteUserTable", async (req, res) => {
  let userId = req.headers.userid;
  await databaseOperations.deleteUserTable(db, userId);
  res.status(200).send();
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
