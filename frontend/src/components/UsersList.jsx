import { useSocketContext } from "../contexts/SocketContext";
function UsersList() {
  let { users, setSelectedUser, renderMessages, unread } = useSocketContext();
  if (users.length == 0) {
    return (
      <div>
        <input type="text" placeholder="Search" />
        <p>no online users</p>
      </div>
    );
  }
  return (
    <div>
      <input type="text" placeholder="Search" />

      <div>
        {users.map((client, index) => {
          return (
            <div
              key={client.id}
              onClick={() => {
                renderMessages(client.id);
                setSelectedUser(client.user);
              }}
            >
              {client.user}
              {unread[client.id] ? <span>({unread[client.id]})</span> : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default UsersList;
