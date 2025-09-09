function UsersList({ users }) {
  function handlefriend(socketid) {
    console.log(socketid);
  }
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
                handlefriend(client.id);
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
