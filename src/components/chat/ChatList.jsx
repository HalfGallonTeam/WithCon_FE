import ChatRoom from "./ChatRoom";

const ChatList = () => {
  return (
    <div className="chatlist-container">
      <h1>아이유 드론쇼 콘서트</h1>
      <div className="chat-btn-container">
        <div className="check">
          <input type="checkbox" id="checkroom" />
          <label htmlFor="checkroom">
            <span>마감된 방 보지 않기</span>
          </label>
        </div>
        <button className="nearby"> 내 근처 채팅방</button>
      </div>
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

export default ChatList;
