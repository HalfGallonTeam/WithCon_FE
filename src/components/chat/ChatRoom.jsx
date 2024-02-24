import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";

const ChatRoom = ({ searchData }) => {
  const navigate = useNavigate();
  const { concertTitle } = useParams();
  return (
    <div
      className="chat-room"
      onClick={() => navigate(`/chat-room/${searchData.chatRoomId}`)}
    >
      <div className="chat-top">
        <span className="title">{searchData.chatRoomName}</span>
      </div>
      <div className="chat-bottom">
        <div className="chat-tag">
          {searchData.tags &&
            searchData.tags.map((tag, index) => (
              <span key={index}>#{tag}</span>
            ))}
        </div>
        <div className="member-num-container">
          <span className="member-num">총 인원</span>
          <span className="num">{searchData.userCount}</span>
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
