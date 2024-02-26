import { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import instance from "../../assets/constants/instance";
import ChatMessageForm from "./ChatMessageForm";
import ChatToggle from "./ChatToggle";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { myInfoState } from "../../assets/constants/userRecoilState";
import {
  ChatConcentration,
  ChatMessageBundle,
} from "../../assets/tools/chatFunctions";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";

//컴포넌트 리렌더링을 막기 위한 조치
const basic = {
  chatRoomId: 0,
  roomName: "채팅방",
  performanceName: "공연",
  userCount: "1",
  members: [],
};

const Chat = () => {
  const myId = useRecoilValue(myInfoState).username;
  const memberId = useRecoilValue(myInfoState).memberId;
  const [isPrev, setIsPrev] = useState(true);
  const { chatRoomId } = useParams();
  const [prevMessage, setPrevMessage] = useState(null);
  const [chatInitial, setChatInitial] = useState(basic);
  const [sendButton, setSendButton] = useState(false);
  const [toggle, setToggle] = useState(false);
  const observerRef = useRef(null);
  const messageRef = useRef(null);
  const scrollRef = useRef(null);
  const textRef = useRef(null);
  const chatMembersRef = useRef([]);
  const firstMessageRef = useRef(null);
  const lastMessageRef = useRef(null);
  const callBundle = new ChatMessageBundle(
    firstMessageRef,
    lastMessageRef,
    messageRef,
    chatMembersRef,
    myId,
    setIsPrev,
    setPrevMessage,
    chatRoomId
  );

  const client = useRef(null);
  const subscribe = () => {
    client.current?.subscribe(
      `/exchange/chat.exchange/room.${chatRoomId}`,
      ({ body }) => {
        const datas = JSON.parse(body);
        let same = false;
        if (
          datas.memberId === prevMessage.memberId &&
          datas.sendAt - prevMessage.sendAt < 10000
        ) {
          same = true;
        }
        let memberdata = "";
        if (prevMessage.memberId === me) {
          datas.memberId = 0;
        } else {
          for (const member of chatMembersRef.current) {
            if (member.memberId === datas.memberId) {
              memberdata = member;
              break;
            }
          }
        }
        ChatMessageForm(datas, messageRef.current, same, memberdata);
        lastMessageRef.current = datas.id;
        setPrevMessage(datas);
        scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
        return true;
      }
    );
  };
  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "ws://43.203.64.7:8080/ws",
      //debug(str) {
      //  console.log(str);
      //},
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("웹소켓 연결되었습니다");
        subscribe();
      },
      onStompError: (frame) => {
        console.error(frame, "에러");
      },
    });
    client.current.webSocketFactory = () => {
      return new SockJS("http://43.203.64.7:8080/ws");
    };
    client.current.activate();
  };
  const disconnect = () => {
    client.current?.deactivate();
  };

  const publish = (message) => {
    client.current?.publish({
      destination: `/app/chat/message/${chatRoomId}`,
      body: JSON.stringify({
        memberId: memberId,
        message: message,
      }),
    });
  };

  //채팅방 내부에서만 동작하는 함수 설정.
  let enterRoomNow = true;
  useEffect(() => {
    connect();
    const onView = new ChatConcentration(chatRoomId, myId, lastMessageRef);
    if (enterRoomNow) {
      enterRoomNow = false;
      onView.enterRoomNow();
    }
    document.addEventListener("visibilitychange", onView.changeVisibility);
    window.addEventListener("beforeunload", onView.beforeUnload);
    window.addEventListener("popstate", onView.hashChange);
    return () => {
      disconnect();
      document.removeEventListener("visibilitychange", onView.changeVisibility);
      window.removeEventListener("beforeunload", onView.beforeUnload);
    };
  }, []);

  //채팅방 초기설정
  let firstSet = false;
  useEffect(() => {
    const enterChatRoom = async () => {
      if (firstSet) return;
      firstSet = true;
      try {
        //기본 채팅방 정보 설정
        const response = await instance.get(`/chatRoom/${chatRoomId}/enter`);
        console.log(response, "채팅방 입장");
        const datas = await response.data;
        chatMembersRef.current = datas.members;
        datas.members = [];
        setChatInitial(datas);

        //입장 초기 메세지 설정
        callBundle.callInitialMessages();

        //데이터 그리기가 끝난 후 옵저버를 켭니다.
        const options = {
          root: document.querySelector(".text-area"),
          rootMargin: "100px 0px 0px 0px",
          threshold: 0,
        };
        const callPrevMessages = new IntersectionObserver(
          callBundle.callMessageBefore,
          options
        );
        callPrevMessages.observe(observerRef.current);
      } catch (error) {
        console.error(error, "에러");
      }
    };
    enterChatRoom();
  }, []);

  //현재 채팅을 보낼 수 있는 상태인지 확인합니다.
  const checkSendable = () => {
    if (textRef.current.value && !sendButton) {
      setSendButton(true);
    } else if (!textRef.current.value && sendButton) {
      setSendButton(false);
    }
  };

  const sendMessage = async () => {
    const info = textRef.current.value;
    textRef.current.value = "";
    setSendButton(false);
    publish(info);
  };

  return (
    <div className="chat-container">
      <button onClick={connect}>소켓 연결</button>
      <button onClick={disconnect}>소켓 제거</button>
      <div className="chat-wrap">
        <div className="chat-header">
          <div className="chat-room-name">
            <h1>{chatInitial.performanceName}</h1>
            <h2>{chatInitial.roomName}</h2>
          </div>
          <button className="toggle" onClick={() => setToggle(true)}>
            <GiHamburgerMenu size={20} />
          </button>
          {toggle && (
            <ChatToggle
              setToggle={setToggle}
              members={chatMembersRef.current}
              creator={chatInitial.managerName}
              me={myId}
              performanceId={chatInitial.performanceId}
            />
          )}
        </div>
        <div className="text-area" ref={scrollRef}>
          {isPrev && (
            <div className="observer" ref={observerRef}>
              옵저버입니다. 드러나면 로딩해요.
            </div>
          )}
          <div className="messages" ref={messageRef}>
            <hr aria-label="여기까지 읽었어요" />
            {/**<div className="system-message">
              <div className="profile-img"></div>
              <div className="text">입장하였습니다.</div>
              <div className="message-time">nan:nan:nan</div>
            </div>*/}
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
      </div>
    </div>
  );
};

export default Chat;
