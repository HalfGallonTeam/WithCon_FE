import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import CreateChatRoom from "./CreateChatRoom";
import Paging from "../common/Paging";

const ChatList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(65);
  const url = useLocation();
  useEffect(() => {
    setCurrentPage(new URLSearchParams(url.search).get("page") || 1);
  }, [url]);

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
        <input id="hashtag" placeholder="해시태그를 입력해 주세요." />
        <button>검색</button>
      </div>
      <div className="chat-btn-container">
        <div className="check">
          <input type="checkbox" id="checkroom" />
          <label htmlFor="checkroom">
            <span>마감된 방 보지 않기</span>
          </label>
        </div>
        <div className="create-chat">
          <button className="create-chat-btn" onClick={openModal}>
            채팅방 만들기
          </button>
        </div>
        {isModalOpen && <CreateChatRoom onClose={closeModal} />}
      </div>
      <div className="list-container">
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
        <ChatRoom />
      </div>
      <Paging totalCount={totalCount} currentPage={currentPage} />
    </div>
  );
};

export default ChatList;
