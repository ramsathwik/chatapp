import { useSocketContext } from "../contexts/SocketContext";
function Header() {
  let { selectedUser, typingstatus, selectedUserRef } = useSocketContext();
  return (
    <div>
      <h1>{selectedUser}</h1>
      {typingstatus && typingstatus === selectedUserRef.current && (
        <span>typing...</span>
      )}
    </div>
  );
}
export default Header;
