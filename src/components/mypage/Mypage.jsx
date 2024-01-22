import { Outlet, Link } from "react-router-dom";

const MyPage = () => {
  return (
    <div className="mypage-container">
      <div>
        <div className="mypage-title">
          <h1>마이 페이지</h1>
        </div>
        <div className="btn-container">
          <button className="btn-mid">
            <Link to="/mypage/">찜한공연</Link>
          </button>
          <button className="btn-mid second-btn">
            <Link to="/mypage/mychat/">내 채팅방</Link>
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default MyPage;
