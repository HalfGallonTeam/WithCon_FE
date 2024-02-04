import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import instance from "../../assets/constants/instance";

//컴포넌트 리렌더링을 막기 위한 조치
const basic = {
  chatRoomId: 12,
  roomName: "토요일 콘서트 같이 가자요... 제발요",
  userCount: "1",
  members: [
    {
      email: "tester@test.com",
      username: "abcd7787",
      password: "password",
      loginType: "HOME",
      nickName: "위콘2",
      phoneNumber: "010-7774-4567",
    },
  ],
};

const Chat = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const toggleRef = useRef(null);
  const toggleOpen = (e) => {
    e.stopPropagation();
    setToggle(true);
  };

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

  //주소창 기반으로 채팅방 정보를 불러옵니다.
  const { concertTitle, id } = useParams();
  const [parentPerformance, setParentPerformance] =
    useState("아이유 드론쇼 콘서트");
  const [chatInitial, setChatInitial] = useState(basic);

  useEffect(() => {
    const enterChatRoom = async () => {
      try {
        //부모공연 이름 세팅
        const responseTitle = await instance.get(
          `/performances/${concertTitle}`
        );
        const dataTitle = await responseTitle.data["title"];
        setParentPerformance(dataTitle);
        //채팅방 초기설정
        //const response = await instance.get(`/chatRoom/${id}/enter`);
        const response = await instance.get("chatRoomEnter/1");
        const datas = await response.data;
        setChatInitial(datas);
      } catch (error) {
        console.error(error, "에러");
      }
    };
    enterChatRoom();
  }, []);

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
  chatInitial.members.map((member) => {
    chatMembers.push(
      <li key={member.username} className="member-info">
        <div className="member-img">{member.username}</div>
        <div className="member-name">{member.nickName}</div>
      </li>
    );
  });

  return (
    <div className="chat-container">
      <div className="chat-wrap">
        <div className="chat-header">
          <div className="chat-room-name">
            <h1>{parentPerformance}</h1>
            <h2>{chatInitial.roomName}</h2>
          </div>
          <button className="toggle" onClick={toggleOpen}>
            <GiHamburgerMenu size={20} />
          </button>
          {toggle && (
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
          )}
        </div>
        <div className="text-area">
          <div className="member-other">
            <div className="profile-img"></div>
            <div className="text">일이삼사오육칠팔구십</div>
          </div>
          <div className="member-me">
            <div className="text">원투쓰리포파이브식스세븐에잇나인텐</div>
            <div className="profile-img"></div>
          </div>
        </div>
        <div className="send-area">
          <textarea placeholder="입력란" />
          <button>보내기</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
