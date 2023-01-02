const express = require("express");
const http = require('http');
const { Server } = require("socket.io");
const { allowSingleSession } = require("./socket/allowSingleSession");

const PORT = process.env.PORT || 5001;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json())

let authorized = true;

/* Auth */
function checkAuth(req, res, next) {
  if (authorized) {
    next();
  } else {
    res.status(403).send('Unauthorized!')
    return
  }
}

app.use('/private', checkAuth);
/************************/


app.post('/private/actions', (req, res) => {
    // TODO: write action to MySQL database
    console.log("action:")
    console.log(req.body);
    console.log();
    res.status(200).send();
});

//app.post('/auth/login', (req, res) => login(req.body.email, req.body.password, res));
//app.post('/auth/createaccount',  (req, res) => createAccount(req.body.email, req.body.password, res));

// Contains logic for validating that a user only has a single session
// TODO: emit event from client on login containing userID, trigger function on login event
io.on('connection', (socket) => {
  allowSingleSession(socket)
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});