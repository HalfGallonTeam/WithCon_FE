import { useEffect, useRef, useState } from "react";
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";
import { BiBell } from "react-icons/bi";
import instance from "../../assets/constants/instance";
import { EventSourcePolyfill } from "event-source-polyfill";

const Notification = () => {
  const [alarmListOpen, setAlarmListOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const listRef = useRef(null);
  const clickOutSide = (e) => {
    if (listRef.current && !listRef.current.contains(e.target)) {
      setAlarmListOpen(false);
    }
  };
  const clickAlarm = () => {
    setAlarmListOpen(!alarmListOpen);
  };

  useEffect(() => {
    //마운트 될때 클릭 이벤트 추가 외부 클릭시 리스트 닫기
    document.addEventListener("mousedown", clickOutSide);
    return () => {
      // 컴포넌트가 언마운트될 때 클릭 이벤트 제거
      document.removeEventListener("mousedown", clickOutSide);
    };
  }, [alarmListOpen]);
  const liClick = (e) => {
    //li를 클릭했을 때 닫히는 현상 막기

    e.stopPropagation();
  };
  //SSE관련 콬드
  const [notifications, setNotifications] = useState([]);
  const clickDelete = (list) => {
    setNotifications((prev) => prev.filter((item) => item !== list));
  };
  //테스트
  const accessToken = JSON.parse(localStorage.getItem("withcon_token"));
  useEffect(() => {
    // SSE 접속 => feat/api에 사용
    const lastEventId = localStorage.getItem("chat");
    const EventSource = EventSourcePolyfill;
    if (accessToken) {
      const eventSource = new EventSource("/api/notification/subscribe", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Last-Event-ID": lastEventId,
          "Content-Type": "text/event-stream",
          heartbeatTimeout: 6000000,
        },
      });

      // const eventSource = new EventSource("/api/notification/subscribe", {
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //     "Last-Event-ID": lastEventId,
      //     "Content-Type": "text/event-stream; charset=UTF-8",
      //   },
      // });
      // const eventSource = new EventSource(
      //   "http://localhost:3001/notification/subscribe"
      // );

      eventSource.onmessage = (event) => {
        const newNotification = event.data;

        // const newNotification = JSON.parse(event.data).message;
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          newNotification,
        ]);

        console.log(newNotification);
      };

      eventSource.onerror = (error) => {
        console.error("SSE Error:", error);
        eventSource.close();
      };

      return () => {
        //SSE 연결 해제
        eventSource.close();
      };
    }
  }, [accessToken]);

  //알림설정 부분
  const fetchPrevNotifications = async () => {
    try {
      const response = await instance.get("/notifications");
      console.log(response);
      const data = await response.data.message;
      setNotifications(data);
    } catch (error) {
      console.error("에러난다 SSE", error);
    }
  };

  return (
    <div className="alarm-area" onClick={clickAlarm} ref={listRef}>
      <BiBell size={24} className="bell" />
      <span>{notifications.length}</span>
      {alarmListOpen === true ? (
        <div className="alarm-list-container">
          <div className="list-top">지난 알림 목록</div>
          <ul className="alarm-list" onClick={liClick}>
            {notifications?.map((list, idx) => (
              <li className="alarm-contents" key={idx}>
                <div className="alarm-text">{list}</div>
                <button
                  className="delete-btn"
                  onClick={() => clickDelete(list)}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Notification;
