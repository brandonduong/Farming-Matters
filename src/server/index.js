const express = require("express");
const http = require('http');
const { Server } = require("socket.io");
require("dotenv").config();

// Redis setup
const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_HOSTNAME,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD
});

const PORT = process.env.PORT || 5001;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json())

app.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).send();
});

io.on('connection', async (socket) => {
  console.log(`\na user connected, id ${socket.id}`);
  
  const userID = '123'; // client should send userID once user is authenticated. See https://socket.io/docs/v4/middlewares/#sending-credentials
  let isSessionActive;

  // Query the database for the active session ID corresponding to the current user
  await redis.get(userID, (err, sessionID) => {
    if (err) {
      console.error(err);
    } else {
      isSessionActive = socket.id === sessionID || !sessionID;

      console.log(`current: ${socket.id}`);
      console.log(`active: ${sessionID}`);
    }
  });
  
  if (!isSessionActive) {
    console.log(`denied!!! socket: ${socket.id}`)
    socket.emit('deny')
  } else {
    // if session is active, set as active in db
    const expirySeconds = 60*60*12 // 60 secs * 60 mins * 12 hrs = 1/2 day
    redis.set(userID, socket.id, "NX", "EX", expirySeconds)
  }

  socket.on('disconnecting', () => {
    if (isSessionActive){
      console.log("active user disconnected, deleting...")
      redis.del(userID)
    }
    console.log(`user disconnected, id ${socket.id}`);
  })
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});