import { useEffect, useRef, useState } from "react";
import { BiBell } from "react-icons/bi";
import instance from "../../assets/constants/instance";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const [alarmListOpen, setAlarmListOpen] = useState(false);
  const listRef = useRef(null);
  const navigate = useNavigate();

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

  //테스트
  const accessToken = JSON.parse(localStorage.getItem("withcon_token"));
  useEffect(() => {
    // SSE 접속 => feat/api에 사용
    const EventSource = EventSourcePolyfill;
    if (accessToken) {
      let eventSource = new EventSource("/api/notification/subscribe", {
        headers: {
          Authorization: accessToken,
          "Content-Type": "text/event-stream",
        },
        heartbeatTimeout: 1800000,
      });
      eventSource.onopen = () => {
        fetchPrevNotifications();
        console.log("SSE 연결했음");
      };
      eventSource.onmessage = (event) => {
        console.log("메세지왔음", event.data);
        if (event.data !== `SSE 구독 완료 memberId: ${event.data.memberId}`) {
          return;
        } else {
          const newNotification = event.data;
          notifications.push(newNotification);
        }
      };

      eventSource.onerror = (error) => {
        console.log(error.readyState);
        if (error.readyState === EventSource.CLOSED) {
          console.log("Reconnecting...");
          eventSource = new EventSource("/api/notification/subscribe", {
            headers: {
              Authorization: accessToken,
              "Content-Type": "text/event-stream",
            },
            heartbeatTimeout: 1800000,
          });
          eventSource.onopen = () => {
            console.log("재연결 ㄱㄱ");
          };
        }
        console.error("SSE Error:", error);
        eventSource.close();
      };

      return () => {
        //SSE 연결 해제
        eventSource.close();
      };
    }
  }, []);

  const fetchPrevNotifications = async () => {
    try {
      const response = await instance.get("/notifications");
      console.log(response, "데이터 있음?");

      const data = await response.data;

      const dataList = await data.filter((x) => !Array.isArray(x));

      setNotifications(dataList);
    } catch (error) {
      console.error("에러난다 SSE", error);
    }
  };

  //알림설정 부분
  const handleMessage = (e, item) => {
    e.preventDefault();
    navigate(item.url);
    window.location.reload();
  };
  const handleDelete = async (item) => {
    try {
      const response = await instance.put(
        `/notification/${item.notificationId}`
      );
      console.log(response.status);
      setNotifications((lists) =>
        lists.filter((list) => list.notificationId !== item.notificationId)
      );
    } catch (error) {
      console.error("check error", error);
    }
  };

  return (
    <div className="alarm-area" onClick={clickAlarm} ref={listRef}>
      <BiBell size={24} className="bell" />
      <span>{notifications?.length}</span>
      {alarmListOpen === true ? (
        <div className="alarm-list-container">
          <div className="list-top">지난 알림 목록</div>

          <ul className="alarm-list" onClick={liClick}>
            {notifications?.map((item) => (
              <li className="alarm-contents" key={item.notificationId}>
                <div
                  className="alarm-text"
                  onClick={(e) => handleMessage(e, item)}
                >
                  {item.message}
                </div>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item)}
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
