let onlineusers = [];

function sockethandling(io) {
  io.on("connection", (socket) => {
    let currentuser = null;

    socket.on("setuser", (user) => {
      currentuser = user;

      // only add if not already present
      let exists = onlineusers.find((u) => u.user === user);
      if (!exists) {
        onlineusers.push({ id: socket.id, user });
      } else {
        // just update socket id (refresh case)
        exists.id = socket.id;
      }

      console.log("online:", onlineusers);
      io.emit("onlineusers", onlineusers);
    });

    socket.on("disconnect", () => {
      if (currentuser) {
        // remove only if that user has no active socket anymore
        onlineusers = onlineusers.filter((u) => u.user !== currentuser);
        console.log("from disconnect", onlineusers);
        io.emit("onlineusers", onlineusers);
      }
    });

    socket.on("chatMessage", (msg) => {
      io.emit("chatMessage", msg);
    });
  });
}
module.exports = sockethandling;
