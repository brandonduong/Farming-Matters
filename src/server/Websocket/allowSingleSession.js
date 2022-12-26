const { redis } = require("../Redis")

const allowSingleSession = async (socket) => {
    const userID = '123'; // client should send userID once user is authenticated. See https://socket.io/docs/v4/middlewares/#sending-credentials
    let isSessionActive;
  
    // Query the database for the active session ID for the current user
    await redis.get(userID, (err, sessionID) => {
      if (err) {
        console.error(err);
      } else {
        isSessionActive = socket.id === sessionID || !sessionID;
  
        console.log(`current: ${socket.id}`);
        console.log(`active: ${sessionID}`);
      }
    });
    
    if (isSessionActive) {
      // If session is active, set as active in the db
      const expirySeconds = 60*60*12 // 60 secs * 60 mins * 12 hrs = 1/2 day
      redis.set(userID, socket.id, "NX", "EX", expirySeconds)
  
    } else {
      socket.emit('deny')
    }
  
    // If the active session ends, remove it from the db
    socket.on('disconnecting', () => {
      if (isSessionActive){
        console.log("active user disconnected, deleting...")
        redis.del(userID)
      }
    })
  }

module.exports = { allowSingleSession };