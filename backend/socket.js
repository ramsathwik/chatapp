let onlineusers = [];
function sockethandling(io) {
  io.on("connection", (socket) => {
    let currentuser = null;

    //set user
    socket.on("setuser", (user) => {
      currentuser = user;
      onlineusers.push(user);
      io.emit("onlineusers", onlineusers);
    });

    //disconnect
    socket.on("disconnect", () => {
      if (currentuser) {
        onlineusers = onlineusers.filter((user) => user != currentuser);
      }
    });

    //chatMessage
    socket.on("chatMessage", (msg) => {
      io.emit("chatMessage", msg);
    });
  });
}
module.exports = sockethandling;
