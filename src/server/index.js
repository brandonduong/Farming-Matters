const express = require("express");
const http = require('http');
const { Server } = require("socket.io");
const { allowSingleSession } = require("./socket/allowSingleSession");
const { login } = require("./auth/login");
const { createAccount } = require("./auth/createAccount");

const PORT = process.env.PORT || 5001;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json())

app.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).send();
});

app.post('/auth/login', async (req, res) => login(req.body.email, req.body.password, res));
app.post('/auth/createaccount', async (req, res) => createAccount(req.body.email, req.body.password, res));

// Contains logic for validating that a user only has a single session
// TODO: emit event from client on login containing userID, trigger function on login event
io.on('connection', async (socket) => allowSingleSession(socket));

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});