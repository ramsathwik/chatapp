import useSocket from "../hooks/useSocket";
import UsersList from "../components/UsersList";
import Chatbox from "../components/Chatbox";
import Messagebox from "../components/Messagebox";
import { SocketContext } from "../contexts/SocketContext";
import { useContext } from "react";
function Dashboard() {
  let socketData = useContext(SocketContext);
  if (!socketData) {
    return <p>loading the chat</p>;
  }
  let { users, messages, sendMessage } = socketData;
  return (
    <div className="flex">
      <UsersList users={users}></UsersList>
      <div className="flex-1">
        <Chatbox messages={messages}></Chatbox>
        <Messagebox onsend={sendMessage}></Messagebox>
      </div>
    </div>
  );
}
export default Dashboard;
