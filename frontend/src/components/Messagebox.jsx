import messagehandler from "../utils/messagehandler";
import { useRef } from "react";
import { useSocketContext } from "../contexts/SocketContext";
function Messagebox() {
  let { sendMessage, showTyping } = useSocketContext();
  let msgRef = useRef();
  return (
    <form
      onSubmit={(e) => {
        let msg = messagehandler(e, msgRef);
        sendMessage(msg);
      }}
    >
      <input
        type="text"
        placeholder="Message"
        ref={msgRef}
        onChange={() => {
          showTyping();
        }}
      />
      <button type="submit">send</button>
    </form>
  );
}
export default Messagebox;
