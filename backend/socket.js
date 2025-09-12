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
    //disconnect
    socket.on("disconnect", (reason, details) => {
      console.log(reason, details);
      if (currentuser) {
        // remove only if that user has no active socket anymore
        onlineusers = onlineusers.filter((u) => u.user !== currentuser);
        console.log("from disconnect", onlineusers);
        io.emit("onlineusers", onlineusers);
      }
    });
    //chat message
    socket.on("chatMessage", (msg) => {
      io.emit("chatMessage", msg);
    });

    //private message
    socket.on("privateMessage", (msg) => {
      let { from, fromid, to, text } = msg;
      io.to(to).emit("privateMessage", { from, id: fromid, text });
      socket.emit("privateMessage", { from, id: to, text });
    });

    //typing status
    socket.on("showTyping", (msg) => {
      let { fromid, to } = msg;
      io.to(to).emit("showTyping", { id: fromid, text: "typing..." });
    });
  });
}
module.exports = sockethandling;
