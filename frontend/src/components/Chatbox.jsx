import Header from "./Header";
import { useSocketContext } from "../contexts/SocketContext";
function Chatbox() {
  let { messages } = useSocketContext();

  return (
    <>
      <Header></Header>
      {messages &&
        messages.map((msg, index) => {
          return (
            <div key={index}>
              {msg.from}:{msg.text}
            </div>
          );
        })}
    </>
  );
}
export default Chatbox;
