import { Outlet, Link } from "react-router-dom";

const ConDetail = () => {
  return (
    <div className="detail-container">
      <div className="con-detail">
        <div className="btn-container">
          <Link to="/title/:concert-title/">
            <button className="btn-mid">공연 상세정보</button>
          </Link>
          <Link to="/title/:concert-title/chat/">
            <button className="btn-mid second-btn">채팅방 목록</button>
          </Link>
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
