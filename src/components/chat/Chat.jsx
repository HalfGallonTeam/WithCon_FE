import { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import instance from "../../assets/constants/instance";
import ChatMessageForm from "./ChatMessageForm";
import ChatToggle from "./ChatToggle";
import basicProfile from "../../assets/images/profile2.jpg";

//컴포넌트 리렌더링을 막기 위한 조치
const basic = {
  chatRoomId: 12,
  roomName: "토요일 콘서트 같이 가자요... 제발요",
  performanceName: "리렌더링용 공연이름",
  userCount: "1",
  members: [
    {
      email: "tester@test.com",
      username: "abcd7787",
      password: "password",
      loginType: "HOME",
      nickName: "위콘2",
      phoneNumber: "010-7774-4567",
      profileImage: basicProfile,
    },
  ],
};

const Chat = () => {
  const [chatInitial, setChatInitial] = useState(basic);
  const [sendButton, setSendButton] = useState(false);
  const [talker, setTalker] = useState("me"); //지울 것입니다.
  const [messages, setMessages] = useState([]);
  const [toggle, setToggle] = useState(false);
  const textRef = useRef(null);
  const toggleRef = useRef(null);
  const firstMessageRef = useRef(null);
  const lastMessageRef = useRef(null);
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

  //사용자가 채팅방에 집중하는지 확인합니다.
  let enterRoomNow = true;
  let hashHere = true;
  useEffect(() => {
    if (enterRoomNow) {
      enterRoomNow = false;
      instance.post("/notifications", {
        watching: "enter",
      });
    }
    const changeVisibility = () => {
      instance.post("/notifications", {
        watching: !document.hidden + "",
        //"hidden", "visible" 이름으로 보내기.
      });
      if (document.hidden) {
        const id = lastMessageRef.current;
        localStorage.setItem("chat", JSON.stringify(id));
      }
    };
    const beforeUnload = () => {
      instance.post("/notifications", {
        watching: "exit",
      });
      const id = lastMessageRef.current;
      localStorage.setItem("chat", JSON.stringify(id));
    };
    const hashChange = () => {
      if (hashHere) {
        hashHere = false;
        instance.post("/notifications", {
          watching: "false",
        });
        const id = lastMessageRef.current;
        localStorage.setItem("chat", JSON.stringify(id));
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

  //채팅방 초기설정
  useEffect(() => {
    const enterChatRoom = async () => {
      try {
        //기본 채팅방 정보 설정
        const response = await instance.get("chatRoomEnter/1");
        const datas = await response.data;
        setChatInitial(datas);

        //입장 초기 메세지 설정
        let startId = localStorage.getItem("chat");
        let url = "/chatMessages";
        url += startId
          ? `?_start=${Math.max(0, startId - 5)}&_limit=5`
          : "?_start=40&_limit=30";
        const response2 = await instance.get(url);
        const datas2 = await response2.data;
        setMessages(datas2);

        //로컬스토리지용 아이디 세팅
        firstMessageRef.current = datas2[0].id || 0;
        lastMessageRef.current = datas2[datas2.length - 1].id;
      } catch (error) {
        console.error(error, "에러");
      }
    };
    enterChatRoom();
  }, []);

  //이전에 쌓인 채팅정보를 불러옵니다. id 숫자 계산해서 요청.
  const callMessageBefore = async () => {
    if (firstMessageRef.current === 0) return;
    let url = "/chatMessages";
    url += `?_start=${Math.max(0, firstMessageRef.current - 6)}&_limit=5`;
    const response = await instance.get(url);
    const datas = await response.data;
    setMessages([...datas, ...messages]);
    firstMessageRef.current = datas[0].id;
  };

  const changeTalker = () => {
    //이 버튼은 서버와 연결되면 사라질 것입니다.
    if (talker === "me") setTalker("other");
    else setTalker("me");
  };
  const sendMessage = async () => {
    const time = new Date();
    const info = textRef.current.value;
    textRef.current.value = "";
    setSendButton(false);
    const newMessage = {
      from: talker,
      text: info,
      timeStamp: time.getTime(),
    };
    const response = await instance.post("/chatMessages", newMessage);
    const datas = await response.data;
    setMessages([...messages, datas]);
    lastMessageRef.current = datas.id;
    return true;
  };

  //현재 채팅을 보낼 수 있는 상태인지 확인합니다.
  const checkSendable = () => {
    if (textRef.current.value && !sendButton) {
      setSendButton(true);
    } else if (!textRef.current.value && sendButton) {
      setSendButton(false);
    }
  };

  const drawMessages = [];
  messages.map((message, index) => {
    let same = false;
    if (index) {
      const prevMessage = messages[index - 1];
      const nowMessage = message;
      if (
        prevMessage.from === nowMessage.from &&
        nowMessage.timeStamp - prevMessage.timeStamp < 10000
      ) {
        same = true;
      }
    }
    drawMessages.push(ChatMessageForm(JSON.stringify(message), index, same));
  });

  return (
    <div className="chat-container">
      <div className="chat-wrap">
        <div className="chat-header">
          <div className="chat-room-name">
            <h1>{chatInitial.performanceName}</h1>
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
        <div className="text-area">
          <div className="observer" onClick={callMessageBefore}>
            옵저버입니다. 드러나면 로딩해요.
          </div>
          <div className="system-message">
            <div className="profile-img"></div>
            <div className="text">입장하였습니다.</div>
            <div className="message-time">nan:nan:nan</div>
          </div>
          {drawMessages}
        </div>
        <div className="send-area">
          <textarea
            placeholder="입력란"
            ref={textRef}
            onChange={checkSendable}
          />
          <button onClick={sendMessage} className={sendButton ? "active" : ""}>
            보내기
          </button>
        </div>
        <button onClick={changeTalker}>
          메세지 보내는 사람:&nbsp;{talker}
        </button>
      </div>
    </div>
  );
};

export default Chat;
