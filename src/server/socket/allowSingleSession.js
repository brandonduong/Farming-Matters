const { redis } = require("../redis")

/**
 * @description This function contains all the logic to handle allowing only one client at a time to access the app.
 *              It uses a socket connection and contains methods to handle login, logout, and disconnect events.
 *              A Redis DB is used to keep track of active connections.
 * 
 * @param {Socket} socket The socket instance used to communicate with the client.
 * @param {Map} allClients A hashmap tracking all active connections to the server, mapping each client socket ID to a connected user ID.  
 *                         A user who is already connected will have a duplicate userID 
 */
const allowSingleSession = async (socket, allClients) => {
    let isSessionActive;

    // When a client logs in
    socket.on('login', async (uid) => {
      allClients.set(socket.id, uid);

      // Query the Redis database for the active session ID for the current user
      // IMPORTANT: The redis database is a hashmap which maps userIDs to socketIDs. It keeps track of only the active (aka permitted) connections. 
      //            So querying the Redis database for a given userID will return the only socket ID which is currently permitted for that user.
      await redis.get(uid, (err, activeSocketID) => {
        if (err) {
          console.error(err);
        } else {
          // A session is active if the current socket ID matches the socket ID in the database, or if there is no active socket.
          isSessionActive = socket.id === activeSocketID || !activeSocketID;
    
          console.log(`current: ${socket.id}`);
          console.log(`active: ${activeSocketID}`);
        }
      });
      
      if (isSessionActive) {
        console.log(`new active session: ${socket.id}\n`)
        // If session is active, set as active in the db
        const expirySeconds = 60*60*12 // entry expires after 60 secs * 60 mins * 12 hrs = 0.5 days (meaning info about unique connections will be dropped after that time from Redis).
        redis.set(uid, socket.id, "NX", "EX", expirySeconds);

        // Permit the client
        socket.emit('accept');

      } else {
        // Deny the client
        socket.emit('deny');
        console.log(`socket ${socket.id} denied\n`);
      }
    });

    // When a client logs out
    socket.on('logout', (uid) => {
      console.log("active user logged out, deleting user", uid, "on socket", socket.id);
      redis.del(uid);
      allClients.delete(socket.id);
      isSessionActive = false;
    });

    // When a client disconnects
    socket.on('disconnect', () => {
      console.log(`user disconnected! socket: ${socket.id}, user: ${allClients.get(socket.id)}`)

      const uid = allClients.get(socket.id);

      // Remove the connection from the Redis db if it is an active connection
      if (uid && isSessionActive){
        console.log("active user disconnected, deleting...");
        redis.del(uid);
        isSessionActive = false;
      }

      allClients.delete(socket.id);
    });
  }

module.exports = { allowSingleSession };