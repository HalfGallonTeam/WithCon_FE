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
  const [sendButton, setSendButton] = useState(false);
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
        //만약, 중도 입장했을 경우, 기존에 쌓인 채팅 메세지를 불러옵니다. localStorage기반으로.
        let startId = localStorage.getItem("chat");
        let url = "/chatMessages";
        url += startId
          ? `?_start=${startId}&_limit=30`
          : "?_start=40&_limit=30";
        const response2 = await instance.get(url);
        const datas2 = await response2.data;
        setMessages(datas2);
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
      if (document.hidden) {
        console.log(messages);
        const id = messages[messages.length - 1]["id"];
        localStorage.setItem("chat", JSON.stringify(id));
      }
    };
    const beforeUnload = () => {
      instance.post("/notifications", {
        watching: "exit",
        time: 0,
      });
      const id = messages[messages.length - 1]["id"];
      localStorage.setItem("chat", JSON.stringify(id));
    };
    const hashChange = () => {
      if (hashHere) {
        hashHere = false;
        const time = new Date().getSeconds();
        instance.post("/notifications", {
          watching: "false",
          time: time,
        });
        const id = messages[messages.length - 1]["id"];
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
          <textarea
            placeholder="입력란"
            ref={textRef}
            onChange={checkSendable}
          />
          <button
            onClick={sendMessage}
            className={sendButton ? "active" : "hidden"}
          >
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
