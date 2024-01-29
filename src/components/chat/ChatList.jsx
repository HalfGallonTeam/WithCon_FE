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
    <div className="chat-list-container">
      <h1>채팅방 목록</h1>
      <div className="hashtag-search">
        <label htmlFor="hashtag">해시태그</label>
        <input id="hashtag" placeholder="해시태그를 입력해 주세요." />
      </div>
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
