import useSocket from "../hooks/useSocket";
import UsersList from "../components/UsersList";
import Chatbox from "../components/Chatbox";
import Messagebox from "../components/Messagebox";
function Dashboard() {
  let { users, messages, sendMessage } = useSocket();
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
