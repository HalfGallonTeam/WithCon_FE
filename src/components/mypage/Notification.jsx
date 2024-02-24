import { useEffect, useRef, useState } from "react";
import { BiBell } from "react-icons/bi";
import instance from "../../assets/constants/instance";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const [alarmListOpen, setAlarmListOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const accessToken = JSON.parse(localStorage.getItem("withcon_token"));
  const listRef = useRef(null);
  const eventSourceRef = useRef(null);
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
  useEffect(() => {
    const fetchPrevNotifications = async () => {
      try {
        const response = await instance.get("/notifications");
        const data = await response.data;
        setNotifications(data);
      } catch (error) {
        console.error("에러난다 SSE", error);
      }
    };
    fetchPrevNotifications();
  }, []);

  /* const isJSONString = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  }; */
  useEffect(() => {
    const EventSource = EventSourcePolyfill;
    if (accessToken) {
      //지우기 끝
      if (!eventSourceRef.current) {
        eventSourceRef.current = new EventSource(
          "/api/notification/subscribe",
          {
            headers: {
              Authorization: accessToken,
              "Content-Type": "text/event-stream",
            },
            heartbeatTimeout: 1800000,
          }
        );
        eventSourceRef.current.onopen = () => {
          console.log("SSE 연결했음");
        };
        //SSE 이벤트 수신
        eventSourceRef.current.onmessage = (event) => {
          const data = JSON.parse(event.data);
          if (data.message.includes(`SSE`)) {
            return;
          } else {
            setNotifications((prevNotifications) => [
              ...prevNotifications,
              data,
            ]);
          }

          // }
        };
        eventSourceRef.current.onerror = (error) => {
          console.log(error.readyState);
          if (error.readyState === EventSource.CLOSED) {
            console.log("Reconnecting...");
            eventSourceRef.current = new EventSource(
              "/api/notification/subscribe",
              {
                headers: {
                  Authorization: accessToken,
                  "Content-Type": "text/event-stream",
                },
                heartbeatTimeout: 1800000,
              }
            );
            eventSourceRef.current.onopen = () => {
              console.log("재연결 ㄱㄱ");
            };
          }
          console.error("SSE Error:", error);
          eventSourceRef.current.close();
        };
      }
      return () => {
        //SSE 연결 해제
        if (eventSourceRef.current) {
          eventSourceRef.current.close();
          eventSourceRef.current = null;
        }
      };
    }
  }, [accessToken, notifications]);

  const handleMessage = (e, item) => {
    e.preventDefault();
    const url = item.url.replace("performanceDetail", "title");
    navigate(url);
    window.location.reload();
  };
  const handleDelete = async (item) => {
    try {
      const response = await instance.put(
        `/notification/${item.notificationId}`
      );
      console.log(response);
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
