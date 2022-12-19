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
  const userID = '123'; // client should send userID once user is authenticated. See https://socket.io/docs/v4/middlewares/#sending-credentials
  let isSessionActive;

  // Query the database for the active session ID corresponding to the current user
  await redis.get(userID, (err, sessionID) => {
    if (err) console.error(err);
    else {
      isSessionActive = socket.id === sessionID || !sessionID;
    }
  });
  
  if (isSessionActive) {
    redis.set(userID, socket.id)
  } 
  else {
    socket.emit('deny')
  }

  socket.on('disconnect', () => {
    if (isSessionActive){
      redis.del(userID)
    }
  })
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});