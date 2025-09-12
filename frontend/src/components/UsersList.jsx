import { useSocketContext } from "../contexts/SocketContext";
function UsersList({ users }) {
  let { setSelectedUser, renderMessages } = useSocketContext();
  if (users.length == 0) {
    return <p>no online users</p>;
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default UsersList;
