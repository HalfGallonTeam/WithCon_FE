import { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import instance from "../../assets/constants/instance";
import ChatMessageForm from "./ChatMessageForm";
import ChatToggle from "./ChatToggle";
import basicProfile from "../../assets/images/profile2.jpg";
import AddMessages from "./AddMessages";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { myInfoState } from "../../assets/constants/userRecoilState";

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
  const myId = useRecoilValue(myInfoState).username;
  const { chatRoomId } = useParams();
  const [prevMessage, setPrevMessage] = useState(null);
  const [chatInitial, setChatInitial] = useState(basic);
  const [chatMembers, setChatMembers] = useState([]);
  const [sendButton, setSendButton] = useState(false);
  const [talker, setTalker] = useState("me"); //지울 것입니다.
  const [toggle, setToggle] = useState(false);
  const observerRef = useRef(null);
  const messageRef = useRef(null);
  const scrollRef = useRef(null);
  const textRef = useRef(null);
  const firstMessageRef = useRef(null);
  const lastMessageRef = useRef(null);
  let firstSet = false;

  //현재 채팅을 보낼 수 있는 상태인지 확인합니다.
  const checkSendable = () => {
    if (textRef.current.value && !sendButton) {
      setSendButton(true);
    } else if (!textRef.current.value && sendButton) {
      setSendButton(false);
    }
  };

  //이전 메세지 호출 함수. id 숫자 계산해서 요청.
  const callMessageBefore = async () => {
    if (firstMessageRef.current === 1) return;
    let url = "/chatMessages";
    url += `?_start=${Math.max(0, firstMessageRef.current - 11)}&_limit=10`;
    const response = await instance.get(url);
    const datas = await response.data;
    firstMessageRef.current = datas[0].id;
    AddMessages(datas, messageRef.current, chatMembers, "prepend", myId);
  };
  const callPrevMessages = new IntersectionObserver(callMessageBefore);

  const toggleOpen = (e) => {
    e.stopPropagation();
    setToggle(true);
  };

  //사용자가 채팅방에 집중하는지 확인합니다.
  let enterRoomNow = true;
  let hashHere = true;
  useEffect(() => {
    const sendVisible = (visibleType) => {
      const obj = {
        performanceId: chatInitial.performanceId,
        chatRoomId: chatRoomId,
        visibleType: visibleType,
      };
      return obj;
    };

    if (enterRoomNow) {
      enterRoomNow = false;
      const data = {
        performanceId: chatInitial.performanceId,
        chatRoomId: chatRoomId,
        targetId: myId,
        messageType: "ENTER",
      };
      instance.post("/notification/chatRoom-event", data);
      instance.post("/notification/visible", sendVisible("VISIBLE"));
    }
    const changeVisibility = () => {
      const visibility = document.hidden ? "HIDDEN" : "VISIBLE";
      instance.post("/notification/visible", sendVisible(visibility));
      if (document.hidden) {
        const id = lastMessageRef.current;
        localStorage.setItem("chat", JSON.stringify(id));
      }
    };
    const beforeUnload = () => {
      instance.post("/notification/visible", sendVisible("HIDDEN"));
      const id = lastMessageRef.current;
      localStorage.setItem("chat", JSON.stringify(id));
    };
    const hashChange = () => {
      if (hashHere) {
        hashHere = false;
        instance.post("/notification/visible", sendVisible("HIDDEN"));
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
      if (firstSet) return;
      firstSet = true;
      try {
        //기본 채팅방 정보 설정
        const response = await instance.get(`/chatRoom/${chatRoomId}/enter`);
        const datas = await response.data;
        setChatMembers(datas.chatParticipants);
        datas.chatParticipants = [];
        setChatInitial(datas);

        //입장 초기 메세지 설정
        let startId = localStorage.getItem("chat");
        let url = "/chatMessages";
        url += startId
          ? `?_start=${startId - 1}&_limit=10`
          : "?_start=40&_limit=30";
        const response2 = await instance.get(url);
        const datas2 = await response2.data;

        AddMessages(datas2, messageRef.current, chatMembers, "append", myId);
        setPrevMessage(datas2[datas2.length - 1]);

        //로컬스토리지용 아이디 세팅
        firstMessageRef.current = datas2[0].id || 0;
        lastMessageRef.current = datas2[datas2.length - 1].id;

        //데이터 그리기가 끝난 후 옵저버를 켭니다.
        callPrevMessages.observe(observerRef.current);
      } catch (error) {
        console.error(error, "에러");
      }
    };
    enterChatRoom();
  }, []);

  const changeTalker = () => {
    //이 버튼은 서버와 연결되면 사라질 것입니다.
    if (talker === "me") setTalker("other");
    else setTalker("me");
  };
  const sendMessage = async () => {
    const info = textRef.current.value;
    textRef.current.value = "";
    setSendButton(false);
    const newMessage = {
      memberId: myId,
      roomId: chatRoomId,
      text: info,
    };
    const response = await instance.post("/chatMessages", newMessage);
    const datas = await response.data;
    lastMessageRef.current = datas.id;
    let same = false;
    if (datas.memberId === myId) {
      datas.memberId = "me";
    } else {
      if (
        prevMessage.memberId === datas.memberId &&
        datas.sendAt - prevMessage.sendAt < 10000
      ) {
        same = true;
      }
    }
    setPrevMessage(datas);

    let memberdata = {};
    for (const member of chatMembers) {
      if (member.username === datas.memberId) {
        memberdata = member;
        break;
      }
    }
    ChatMessageForm(datas, messageRef.current, same, memberdata);
    scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    return true;
  };

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
              setToggle={setToggle}
              members={chatMembers}
              creator={chatInitial.managerName}
              me={myId}
              performanceId={chatInitial.performanceId}
            />
          )}
        </div>
        <div className="text-area" ref={scrollRef}>
          <div className="observer" ref={observerRef}>
            옵저버입니다. 드러나면 로딩해요.
          </div>
          <div className="messages" ref={messageRef}>
            <div className="system-message">
              <div className="profile-img"></div>
              <div className="text">입장하였습니다.</div>
              <div className="message-time">nan:nan:nan</div>
            </div>
          </div>
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
