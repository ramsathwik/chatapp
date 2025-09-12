import Header from "./Header";
function Chatbox({ messages, user }) {
  return (
    <>
      <Header user={user}></Header>
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
