import { useNavigate } from "react-router-dom";

const ChatRoom = () => {
  const navigate = useNavigate();
  return (
    <div className="chat-room" onClick={() => navigate("/chat/")}>
      <div className="chat-top">
        <span className="title">토요일 콘서트 같이 갈 사람? 무반응시 강퇴</span>
      </div>
      <div className="chat-bottom">
        <div className="chat-tag">
          <span>#무응답 강퇴</span>
          <span>#무음 금지</span>
        </div>
        <div className="member-num-container">
          <span className="member-num">총 인원</span>
          <span className="num">2 </span>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
