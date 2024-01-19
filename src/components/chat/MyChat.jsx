import ChatRoom from "./ChatRoom";

const MyChat = () => {
  return (
    <div className="mychat-container">
      <div className="list-container">
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
      </div>
      <div className="page">
        <span> &lt; 1 2 3 4 5 &gt;</span>
      </div>
    </div>
  );
};

export default MyChat;
