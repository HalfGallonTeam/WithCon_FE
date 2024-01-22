import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useRef, useState } from "react";

const member = [
  ["one", "1"],
  ["two", "2"],
  ["three", "3"],
];

const Chat = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const toggleRef = useRef(null);
  const toggleOpen = (e) => {
    e.stopPropagation();
    setToggle(true);
  };
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
  return (
    <div className="chat-container">
      <div className="chat-wrap">
        <div className="chat-header">
          <div className="chat-room-name">
            <h1>아이유 드론쇼 콘서트</h1>
            <h2>토요일 콘서트 같이 가자요... 제발요</h2>
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

                <ul className="member-lists">
                  {member.map((member) => {
                    return (
                      <li key={member[1]} className="member-info">
                        <div className="member-img">{member[1]}</div>
                        <div className="member-name">{member[0]}</div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="chat-exit">
                <button>채팅방 나가기</button>
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
