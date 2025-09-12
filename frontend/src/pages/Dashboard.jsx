import useSocket from "../hooks/useSocket";
import UsersList from "../components/UsersList";
import Chatbox from "../components/Chatbox";
import Messagebox from "../components/Messagebox";
import { useSocketContext } from "../contexts/SocketContext";
function Dashboard() {
  let socketData = useSocketContext();
  if (!socketData) {
    return <p>loading the chat</p>;
  }
  let { users, messages, sendMessage, selectedUser } = socketData;
  return (
    <div className="flex">
      <UsersList users={users}></UsersList>
      {selectedUser ? (
        <div className="flex-1">
          <Chatbox messages={messages} user={selectedUser}></Chatbox>
          <Messagebox onsend={sendMessage}></Messagebox>
        </div>
      ) : (
        <p>welcome to chat app</p>
      )}
    </div>
  );
}
export default Dashboard;
