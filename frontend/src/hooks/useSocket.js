import { io } from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";

function useSocket() {
  const chatsRef = useRef({ public: [] }); // Changed to object for clarity
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  let [typingstatus, setTypingStatus] = useState(null);
  const selectedUserRef = useRef();
  const socketRef = useRef();
  const userRef = useRef();
  const typingTimeoutRef = useRef();

  useEffect(() => {
    const socket = io("http://localhost:3000");
    socketRef.current = socket;

    // Extract user name from JWT, with error handling
    let token = localStorage.getItem("token");
    try {
      const payload = jwtDecode(token);
      userRef.current = payload?.name || "Guest";
    } catch (e) {
      userRef.current = "Guest";
      console.error("Invalid or missing JWT token", e);
    }

    // Event handler functions for cleanup
    function handleChatMessage(msg) {
      setMessages((prev) => [...prev, msg]);
    }

    function handlePrivateMessage(msg) {
      if (!chatsRef.current[msg.id]) {
        chatsRef.current[msg.id] = [];
      }
      chatsRef.current[msg.id].push(msg);
      // Optionally update message display if viewing this chat
      if (selectedUserRef.current === msg.id) {
        setMessages([...chatsRef.current[msg.id]]);
      }
    }

    function handleOnlineUsers(userList) {
      const filtered = userList.filter(
        (client) => client.user !== userRef.current
      );
      setUsers(filtered);
      let current = users.find(
        (client) => client.id == selectedUserRef.current
      );
      if (!current) {
        setMessages([]);
        selectedUserRef.current = null;
        setSelectedUser(null);
      }
    }

    function typinghandler(msg) {
      setTypingStatus(msg.id);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        setTypingStatus(null);
        typingTimeoutRef.current = null;
      }, 1000);
    }

    // Attach listeners
    socket.on("chatMessage", handleChatMessage);
    socket.on("privateMessage", handlePrivateMessage);
    socket.on("onlineusers", handleOnlineUsers);
    socket.on("showTyping", typinghandler);

    // Emit user presence
    socket.emit("setuser", userRef.current);

    // Cleanup
    return () => {
      socket.off("chatMessage", handleChatMessage);
      socket.off("privateMessage", handlePrivateMessage);
      socket.off("onlineusers", handleOnlineUsers);
      socket.disconnect();
    };
  }, []);

  // Function to display messages for a selected user/chat
  function renderMessages(socketId) {
    setMessages(chatsRef.current[socketId] || []);
    selectedUserRef.current = socketId;
  }

  // Send message, public or private
  function sendMessage(msg) {
    if (selectedUserRef.current) {
      socketRef.current.emit("privateMessage", {
        from: userRef.current,
        fromid: socketRef.current.id,
        to: selectedUserRef.current,
        text: msg,
      });
    } else {
      socketRef.current.emit("chatMessage", {
        from: userRef.current,
        text: msg,
      });
    }
  }

  //show typing status
  function showTyping() {
    socketRef.current.emit("showTyping", {
      fromid: socketRef.current.id,
      to: selectedUserRef.current,
    });
  }

  return {
    users,
    messages,
    setSelectedUser,
    sendMessage,
    renderMessages,
    selectedUser,
    showTyping,
    typingstatus,
    selectedUserRef,
  };
}

export default useSocket;
