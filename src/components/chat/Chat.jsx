import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import instance from "../../assets/constants/instance";
import ChatMessageForm from "./ChatMessageForm";
import ChatToggle from "./ChatToggle";

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
  const [talker, setTalker] = useState("me");
  const [messages, setMessages] = useState([]);
  const [toggle, setToggle] = useState(false);
  const textRef = useRef(null);
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
  const { concertTitle } = useParams();
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

  //사용자가 채팅방에 집중하는지 확인합니다.
  let enterRoomNow = true;
  let hashHere = true;
  useEffect(() => {
    if (enterRoomNow) {
      enterRoomNow = false;
      const time = new Date().getSeconds();
      instance.post("/notifications", {
        watching: "enter",
        time: time,
      });
    }
    const changeVisibility = () => {
      const time = new Date().getSeconds();
      instance.post("/notifications", {
        watching: !document.hidden + "",
        time: time,
      });
    };
    const beforeUnload = () => {
      instance.post("/notifications", {
        watching: "exit",
        time: 0,
      });
    };
    const hashChange = () => {
      if (hashHere) {
        hashHere = false;
        const time = new Date().getSeconds();
        instance.post("/notifications", {
          watching: "false",
          time: time,
        });
        window.removeEventListener("popstate", hashChange);
      }
    };
    document.addEventListener("visibilitychange", changeVisibility);
    window.addEventListener("beforeunload", beforeUnload);
    window.addEventListener("popstate", hashChange);
    return () => {
      document.removeEventListener("visibilitychange", changeVisibility);
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, []);

  const changeTalker = () => {
    //이 버튼은 서버와 연결되면 사라질 것입니다.
    if (talker === "me") setTalker("other");
    else setTalker("me");
  };
  const sendMessage = () => {
    const time = new Date();
    const info = textRef.current.value;
    textRef.current.value = "";
    const newMessage = {
      from: talker,
      text: info,
      timeStamp: time.getTime(),
    };
    setMessages([...messages, JSON.stringify(newMessage)]);
    return true;
  };

  const drawMessages = [];
  messages.map((message, index) => {
    drawMessages.push(ChatMessageForm(message, index));
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
            <ChatToggle
              toggleRef={toggleRef}
              setToggle={setToggle}
              members={chatInitial.members}
            />
          )}
        </div>
        <div className="text-area">{drawMessages}</div>
        <div className="send-area">
          <textarea placeholder="입력란" ref={textRef} />
          <button onClick={sendMessage}>보내기</button>
        </div>
        <button onClick={changeTalker}>
          메세지 보내는 사람:&nbsp;{talker}
        </button>
      </div>
    </div>
  );
};

export default Chat;
