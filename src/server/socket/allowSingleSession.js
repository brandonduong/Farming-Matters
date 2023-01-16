const { redis } = require("../redis")

const allowSingleSession = async (socket, allClients) => {
    let isSessionActive;

    socket.on('login', async (uid) => {
      allClients.set(socket.id, uid);

      // Query the database for the active session ID for the current user
      await redis.get(uid, (err, sessionID) => {
        if (err) {
          console.error(err);
        } else {
          isSessionActive = socket.id === sessionID || !sessionID;
    
          console.log(`current: ${socket.id}`);
          console.log(`active: ${sessionID}`);
        }
      });
      
      if (isSessionActive) {
        console.log(`new active session: ${socket.id}\n`)
        // If session is active, set as active in the db
        const expirySeconds = 60*60*12 // 60 secs * 60 mins * 12 hrs = 0.5 days
        redis.set(uid, socket.id, "NX", "EX", expirySeconds);
        socket.emit('accept');
      } else {
        socket.emit('deny');
        console.log(`socket ${socket.id} denied\n`);
      }
    });

    socket.on('logout', (uid) => {
      console.log("active user logged out, deleting user", uid, "on socket", socket.id);
      redis.del(uid);
      allClients.delete(socket.id);
      isSessionActive = false;
    });

    // If the active session ends, remove it from the db
    socket.on('disconnect', () => {
      console.log(`user disconnected! socket: ${socket.id}, user: ${allClients.get(socket.id)}`)

      const uid = allClients.get(socket.id);

      if (uid && isSessionActive){
        console.log("active user disconnected, deleting...");
        redis.del(uid);
        isSessionActive = false;
      }

      allClients.delete(socket.id);
    });
  }

module.exports = { allowSingleSession };