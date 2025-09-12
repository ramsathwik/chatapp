import UsersList from "../components/UsersList";
import Chatbox from "../components/Chatbox";
import Messagebox from "../components/Messagebox";
import { useSocketContext } from "../contexts/SocketContext";
function Dashboard() {
  let socketData = useSocketContext();
  if (!socketData) {
    return <p>loading the chat</p>;
  }
  let { selectedUser } = socketData;
  return (
    <div className="flex">
      <UsersList></UsersList>
      {selectedUser ? (
        <div className="flex-1">
          <Chatbox></Chatbox>
          <Messagebox></Messagebox>
        </div>
      ) : (
        <p>welcome to chat app</p>
      )}
    </div>
  );
}
export default Dashboard;
