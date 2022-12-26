const express = require("express");
const http = require('http');
const { Server } = require("socket.io");
const { allowSingleSession } = require("./Websocket/allowSingleSession");

const PORT = process.env.PORT || 5001;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json())

app.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).send();
});

io.on('connection', async (socket) => allowSingleSession(socket));

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});