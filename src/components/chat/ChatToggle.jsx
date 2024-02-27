import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../assets/constants/instance";

const ChatToggle = (props) => {
  const memberRef = useRef(null);
  const toggleRef = useRef(null);
  const members = props.members;
  const setToggle = props.setToggle;
  const { concertTitle, chatRoomId } = useParams();
  const navigate = useNavigate();
  const websocket = props.websocket;
  const myId = props.myId;

  //토글 동작 함수
  useEffect(() => {
    const toggleClose = (e) => {
      if (toggleRef.current && !toggleRef.current.contains(e.target)) {
        setToggle(false);
      }
    };
    document.addEventListener("click", toggleClose);
    return () => {
      document.removeEventListener("click", toggleClose);
    };
  }, []);

  const exitChatroom = async () => {
    try {
      const data = {
        performanceId: props.performanceId,
        chatRoomId: chatRoomId,
        targetId: myId,
        messageType: "EXIT",
      };
      const response = await instance.delete(`/chatRoom/${chatRoomId}/exit`);
      const response2 = await instance.post(
        "/notification/chatRoom-event",
        data
      );
      if (members.length === 1) {
        const response3 = await instance.post(
          `/notification/unsubscribe-channel?chatRoomId=${chatRoomId}`
        );
      }
      if (response.status === 204) {
        websocket?.publish({
          destination: `/app/chat/exit/${chatRoomId}`,
          body: JSON.stringify({
            memberId: myId,
            message: "test",
          }),
        });
        window.alert("채팅방에서 퇴장했습니다.");
        navigate(`/title/${concertTitle}/chat`);
      }
    } catch (error) {
      console.error(error, "에러");
      window.alert(
        "서버 응답 상태가 좋지 않습니다. 잠시 후 다시 시도해주세요."
      );
    }
  };

  const forceOut = async (e) => {
    try {
      const num = Number(chatRoomId);
      const memberId = e.target.value;
      const data = {
        num,
        memberId,
      };
      const response = await instance.delete(
        `/chatRoom/${chatRoomId}/Kick`,
        data
      );
      websocket?.publish({
        destination: `/app/chat/kick/${chatRoomId}`,
        body: JSON.stringify({
          memberId: memberId,
          message: "test",
        }),
      });
    } catch (error) {
      console.error(error, "에러");
    }
  };

  let chatMembers = [];
  members.map((member, index) => {
    const isCreator = props.creator === myId ? "" : "hidden";
    const $element = (
      <li key={index} className="member-info">
        <img className="member-img" src={member.userProfile} alt="" />
        <p className="member-name">{member.nickName}</p>
        <button
          className={`force-out ${isCreator}`}
          onClick={forceOut}
          value={member.memberId}
        >
          강퇴
        </button>
      </li>
    );
    if (member.memberId === myId) {
      chatMembers = [$element, ...chatMembers];
    } else {
      chatMembers.push($element);
    }
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
        <ul className="member-lists" ref={memberRef}>
          {chatMembers}
        </ul>
      </div>
      <div className="chat-exit">
        <button onClick={exitChatroom}>채팅방 나가기</button>
      </div>
    </div>
  );
};

export default ChatToggle;
