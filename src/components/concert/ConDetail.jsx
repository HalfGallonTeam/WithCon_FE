import { Outlet, Link } from "react-router-dom";

const ConDetail = () => {
  return (
    <div className="detail-container">
      <div className="con-detail">
        <div className="btn-container">
          <button className="btn-mid">
            <Link to="/:concert-title/">공연 상세정보</Link>
          </button>
          <button className="btn-mid second-btn">
            <Link to="/:concert-title/chat/">채팅방 목록</Link>
          </button>
        </div>
        <div className="con-info">
          <div className="close">
            <button className="close-btn">X</button>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ConDetail;
