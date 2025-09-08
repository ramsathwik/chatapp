function Chatbox({ messages }) {
  return (
    <>
      <h1>Heading</h1>
      {messages &&
        messages.map((msg, index) => {
          return <div key={index}>{msg}</div>;
        })}
    </>
  );
}
export default Chatbox;
