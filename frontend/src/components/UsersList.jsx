function UsersList({ users }) {
  return (
    <div>
      <input type="text" placeholder="Search" />
      {users && (
        <div>
          {users.map((user, index) => {
            return <div key={index}>{user}</div>;
          })}
        </div>
      )}
    </div>
  );
}
export default UsersList;
