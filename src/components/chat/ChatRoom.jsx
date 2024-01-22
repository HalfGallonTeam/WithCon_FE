import { useNavigate } from "react-router-dom";

const ChatRoom = () => {
  const navigate = useNavigate();
  return (
    <div className="chat-room" onClick={() => navigate("/chat/")}>
      <div className="chat-top">
        <span className="title">토요일 콘서트 같이 갈 사람? 무반응시 강퇴</span>
      </div>
      <div className="chat-bottom">
        <span>OO구 OO로 OO역</span>
        <div className="bottom-right">
          <span>2 / 4</span>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
