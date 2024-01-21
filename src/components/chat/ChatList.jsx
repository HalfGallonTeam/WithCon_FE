import { useState } from "react";
import ChatRoom from "./ChatRoom";
import CreateChatRoom from "./CreateChatRoom";

const ChatList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
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
        <button className="nearby" onClick={openModal}>
          채팅방 만들기
        </button>
        {isModalOpen && <CreateChatRoom onClose={closeModal} />}
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
