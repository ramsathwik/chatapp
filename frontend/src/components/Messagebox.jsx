import messagehandler from "../utils/messagehandler";
import { useRef } from "react";
function Messagebox({ onsend }) {
  let msgRef = useRef();
  return (
    <form
      onSubmit={(e) => {
        let msg = messagehandler(e, msgRef);
        onsend(msg);
      }}
    >
      <input type="text" placeholder="Message" ref={msgRef} />
      <button type="submit">send</button>
    </form>
  );
}
export default Messagebox;
