import { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const ConDetail = () => {
  const navigate = useNavigate();
  const { concertTitle } = useParams();
  const [category, setCategory] = useState("detail");
  const categoryClick = () => {
    if (category === "detail") {
      setCategory("chat");
      navigate(`/title/${concertTitle}/chat`);
    } else if (category === "chat") {
      setCategory("detail");
      navigate(`/title/${concertTitle}`);
    }
  };
  return (
    <div className="detail-container">
      <div className="con-title-container">
        <div className="con-title">
          <h1 className="title">[제주] 2024 장윤정 라이브 콘서트</h1>
          <div className="mini-data">
            <span className="date">2024.02.03 ~ 2024.02.03</span>
            <span className="location">남양주 체육문화센터 실내체육관</span>
          </div>
        </div>
        <div className="con-category">
          <button onClick={categoryClick}>
            {category === "detail" ? "채팅방 목록" : "공연 상세정보"}
          </button>
        </div>
      </div>
      <div className="con-info">
        <Outlet />
      </div>
    </div>
  );
};

export default ConDetail;
