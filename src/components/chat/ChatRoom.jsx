import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ChatRoom = ({ searchData }) => {
  const navigate = useNavigate();
  return (
    <div className="chat-room" onClick={() => navigate("/chat/")}>
      <div className="chat-top">
        <span className="title">{searchData.roomName}</span>
      </div>
      <div className="chat-bottom">
        <div className="chat-tag">
          {searchData.tags.map((tag, index) => (
            <span key={index}>#{tag}</span>
          ))}
        </div>
        <div className="member-num-container">
          <span className="member-num">총 인원</span>
          <span className="num">2 </span>
        </div>
      </div>
    </div>
  );
};
ChatRoom.propTypes = {
  searchData: PropTypes.oneOfType([
    PropTypes.object, // 객체 타입
    PropTypes.arrayOf(PropTypes.object), // 객체의 배열
  ]).isRequired,
};

export default ChatRoom;
