import { useNavigate, useParams } from "react-router-dom";
import instance from "../../assets/constants/instance";

const ChatToggle = (props) => {
  const toggleRef = props.toggleRef;
  const setToggle = props.setToggle;
  const members = props.members;
  const { concertTitle, id } = useParams();
  const navigate = useNavigate();

  const exitChatroom = async () => {
    try {
      const response = await instance.delete(`/chatRoom/${id}/exit`);
      if (response.status === 204) {
        window.alert("채팅방에서 퇴장했습니다.");
        navigate(`/title/${concertTitle}/chat`);
      }
    } catch (error) {
      console.error(error, "에러");
      window.alert("서버 응답 불일치, 채팅방에서 퇴장했습니다.");
      navigate(`/title/${concertTitle}/chat`);
    }
  };

  const chatMembers = [];
  members.map((member) => {
    chatMembers.push(
      <li key={member.username} className="member-info">
        <div className="member-img">{member.username}</div>
        <div className="member-name">{member.nickName}</div>
      </li>
    );
  });
  return (
    <div className="toggle-lists" ref={toggleRef}>
      <div>
        <div className="toggle-close">
          <button onClick={() => setToggle(false)}>X</button>
        </div>
        <div className="title" onClick={() => navigate("/")}>
          위드콘
        </div>
        <ul className="member-lists">{chatMembers}</ul>
      </div>
      <div className="chat-exit">
        <button onClick={exitChatroom}>채팅방 나가기</button>
      </div>
    </div>
  );
};

export default ChatToggle;
