const express = require("express");
const http = require('http');
const { Server } = require("socket.io");
const { allowSingleSession } = require("./socket/allowSingleSession");
const { auth } = require("./firebase");

const PORT = process.env.PORT || 5001;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json())

/* Auth */
function checkAuth(req, res, next) {
  if (req.headers.authtoken) {
    auth.verifyIdToken(req.headers.authtoken)
      .then(() => {
        // Request is verified
        next();
      }).catch((error) => {
        res.status(403).send('Unauthorized');
      });

  } else {
    res.status(403).send('Unauthorized')
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
var allClients = new Map();
io.on('connection', (socket) => {
  allowSingleSession(socket, allClients);
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});