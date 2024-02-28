import { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import instance from "../../assets/constants/instance";
import ChatMessageForm from "./ChatMessageForm";
import ChatToggle from "./ChatToggle";
import { useNavigate, useParams } from "react-router-dom";
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
  const firstEnterRef = useRef(false);
  const navigate = useNavigate();
  const myId = useRecoilValue(myInfoState).memberId;
  const [isPrev, setIsPrev] = useState(true);
  const { chatRoomId } = useParams();
  const prevMessage = useRef(null);
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
    prevMessage,
    chatRoomId
  );

  const client = useRef(null);
  const subscribe = () => {
    client.current?.subscribe(
      `/exchange/chat.exchange/room.${chatRoomId}`,
      ({ body }) => {
        const datas = JSON.parse(body);
        console.log("받은 메세지", datas);
        if (datas.messageType !== "CHAT") {
          if (
            datas.messageType === "ENTER" &&
            !chatMembersRef.current.includes(datas.memberId)
          ) {
            const memberInfo = {
              memberId: datas.memberId,
              userProfile: datas.userProfile,
              nickName: datas.nickName,
            };
            console.log("입장한 사람 프로필", memberInfo);
            chatMembersRef.current = [...chatMembersRef.current, memberInfo];
          } else {
            const newMembers = chatMembersRef.current.filter((member) => {
              member.memberId !== datas.memberId;
            });
            chatMembersRef.current = newMembers;
            if (datas.messageType === "KICK" && datas.memberId === myId) {
              window.alert("채팅방에서 퇴장당했습니다.");
              navigate("/");
            }
          }
        }

        let memberdata = "";
        let same = false;
        if (datas.memberId === myId) {
          datas.memberId = 0;
        } else {
          for (const member of chatMembersRef.current) {
            if (member.memberId === datas.memberId) {
              memberdata = member;
              break;
            }
          }
          if (
            datas.memberId === prevMessage.current?.memberId &&
            datas.sendAt - prevMessage.current?.sendAt < 10000
          ) {
            same = true;
          }
        }
        ChatMessageForm(datas, messageRef.current, same, memberdata);
        lastMessageRef.current = datas.id;
        prevMessage.current = datas;
        scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
      }
    );
  };
  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "ws://43.203.64.7:8080/ws",
      // debug(str) {
      //   console.log(str);
      // },
      connectHeaders: {
        Authorization: JSON.parse(localStorage.getItem("withcon_token")),
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      onConnect: () => {
        if (firstEnterRef.current) {
          client.current?.publish({
            destination: `/app/chat/enter/${chatRoomId}`,
            body: JSON.stringify({
              memberId: myId,
              message: "test",
            }),
          });
        }
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
        memberId: myId,
        message: message,
      }),
    });
    instance.post(`/notification/event?chatRoomId=${chatRoomId}`);
  };

  //채팅방 초기설정
  let firstSet = false;
  let enterRoomNow = true;
  useEffect(() => {
    const enterChatRoom = async () => {
      if (firstSet) return;
      firstSet = true;
      try {
        //기본 채팅방 정보 설정
        const response = await instance.get(`/chatRoom/${chatRoomId}/enter`);
        const status = await response.data.enterStatus;
        if (status === "NEW") {
          firstEnterRef.current = true;
        }
        console.log(response, "채팅방 입장");
        const datas = await response.data;
        chatMembersRef.current = datas.chatParticipants;
        datas.chatParticipants = [];
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
    connect();
    const onView = new ChatConcentration(
      chatRoomId,
      myId,
      lastMessageRef,
      disconnect
    );
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
      <div className="chat-wrap">
        <div className="chat-header">
          <div className="chat-room-name">
            <h2>{chatInitial.performanceName}</h2>
            <h3>{chatInitial.roomName}</h3>
          </div>
          <button
            className="toggle"
            onClick={(e) => {
              e.stopPropagation();
              setToggle(true);
            }}
          >
            <GiHamburgerMenu size={20} />
          </button>
          {toggle && (
            <ChatToggle
              setToggle={setToggle}
              members={chatMembersRef.current}
              creator={chatInitial.managerId}
              myId={myId}
              performanceId={chatInitial.performanceId}
              websocket={client.current}
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
