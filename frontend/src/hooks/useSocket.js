import { io } from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
function useSocket() {
  let [users, setUsers] = useState([]);
  let [messages, setmessages] = useState([]);
  let [selecteduser, setcurrentuser] = useState(null);
  let socketRef = useRef();
  let userRef = useRef();

  console.log("from use socket", selecteduser);

  useEffect(() => {
    let socket = io("http://localhost:3000");
    socketRef.current = socket;

    let token = localStorage.getItem("token");
    let payload = jwtDecode(token);
    userRef.current = payload.name;

    //chatMessage
    socket.on("chatMessage", (msg) => {
      setmessages((prev) => [...prev, msg]);
    });

    //set user
    socket.emit("setuser", userRef.current);

    //online users
    socket.on("onlineusers", (users) => {
      console.log("users is ", users);
      console.log(userRef.current);
      users = users.filter((client) => client.user != userRef.current);
      console.log("users is ", users);
      setUsers(users);
    });
    return () => {
      socket.off();
      socket.disconnect();
    };
  }, []);

  function sendMessage(msg) {
    socketRef.current.emit("chatMessage", { from: userRef.current, text: msg });
  }
  return { users, messages, setcurrentuser, sendMessage };
}
export default useSocket;
