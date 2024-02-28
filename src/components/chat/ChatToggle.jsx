import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../assets/constants/instance";
import ButtonModal from "../common/modal";
import { BsPersonFill } from "react-icons/bs";

const ChatToggle = (props) => {
  const [exitModal, setExitModal] = useState(false);
  const [forceOutModal, setForceOutModal] = useState(false);
  const [aggro, setAggro] = useState("");
  const [aggroId, setAggroId] = useState("");
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
      const response = await instance.delete(
        `/chatRoom/${chatRoomId}/kick/${memberId}`
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

  const exitModalOn = () => setExitModal(true);
  const exitModalOff = () => setExitModal(false);
  const forceOutModalOff = () => setForceOutModal(false);
  const forceOutModalOn = (event) => {
    setAggroId(event.target.value[0]);
    setAggro(event.target.value[1]);
    setForceOutModal(true);
  };

  let chatMembers = [];
  members.map((member, index) => {
    const isCreator =
      props.creator === myId && member.memberId !== myId ? "" : "hidden";
    const $element = (
      <li key={index} className="member-info">
        {!member.userProfile ? (
          <BsPersonFill className="member-img img-null" alt="profileImg" />
        ) : (
          <img className="member-img" src={member.userProfile} alt="" />
        )}
        <p className="member-name">{member.nickName}</p>
        <button
          className={`force-out ${isCreator}`}
          onClick={forceOutModalOn}
          value={[member.memberId, member.nickName]}
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
    <>
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
          <button onClick={exitModalOn}>채팅방 나가기</button>
        </div>
      </div>
      {exitModal && (
        <ButtonModal
          text="정말로 채팅방에서 퇴장하시겠습니까?"
          buttonContainer={2}
          button1="예"
          button2="취소"
          onClickButton1={exitChatroom}
          onClickButton2={exitModalOff}
        />
      )}
      {forceOutModal && (
        <ButtonModal
          text={`${aggro}님을 강퇴하시겠습니까?`}
          buttonContainer={2}
          button1="예"
          button2="취소"
          onClickButton1={forceOut}
          onClickButton2={forceOutModalOff}
          value={aggroId}
        />
      )}
    </>
  );
};

export default ChatToggle;
