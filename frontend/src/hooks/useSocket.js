import { io } from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
function useSocket() {
  let [users, setUsers] = useState(null);
  let [messages, setmessages] = useState([]);
  let socketRef = useRef();
  useEffect(() => {
    let socket = io("http://localhost:3000");
    socketRef.current = socket;

    let token = localStorage.getItem("token");
    let payload = jwtDecode(token);
    let user = payload.name;

    //chatMessage
    socket.on("chatMessage", (msg) => {
      setmessages((prev) => [...prev, msg]);
    });

    //set user
    socket.emit("setuser", user);

    //online users
    socket.on("onlineusers", (users) => {
      console.log("users is ", users);
      users = users.filter((user1) => user1 != user);
      console.log("users is ", users);
      setUsers(users);
    });
    return () => socket.disconnect();
  }, []);

  function sendMessage(msg) {
    socketRef.current.emit("chatMessage", msg);
  }

  return { users, messages, sendMessage };
}
export default useSocket;
