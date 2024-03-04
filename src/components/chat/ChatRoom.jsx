import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import ButtonModal from "../common/modal";

const ChatRoom = ({ searchData }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { concertTitle } = useParams();
  const chatRoomClick = () => {
    if (!localStorage.getItem("withcon_token")) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/login");
      }, 1000);
    } else {
      navigate(`/chat-room/${searchData.chatRoomId}`);
    }
  };
  return (
    <article className="chat-room" onClick={chatRoomClick}>
      <header className="chat-top">
        <h4 className="title">{searchData.roomName}</h4>
      </header>
      <div className="chat-bottom">
        <div className="chat-tag">
          {searchData.tags &&
            searchData.tags.map((tag, index) => (
              <span key={index}>#{tag}</span>
            ))}
        </div>
        {
          // <div className="member-num-container">
          //   <span className="member-num">총 인원</span>
          //   <span className="num">{searchData.userCount}</span>
          // </div>
        }
      </div>
      {showModal ? (
        <ButtonModal
          buttonContainer="0"
          text={"로그인한 사용자만 가능합니다."}
          textColor={"black"}
        />
      ) : null}
    </article>
  );
};
ChatRoom.propTypes = {
  searchData: PropTypes.oneOfType([
    PropTypes.object, // 객체 타입
    PropTypes.arrayOf(PropTypes.object), // 객체의 배열
  ]).isRequired,
};

export default ChatRoom;
