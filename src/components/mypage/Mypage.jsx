import { Outlet, Link } from "react-router-dom";

const MyPage = () => {
  return (
    <div className="mypage-container">
      <div>
        <div className="mypage-title">
          <h1>마이 페이지</h1>
        </div>
        <div className="btn-container">
          <Link to="/mypage/">
            <button className="btn-mid">찜한공연</button>
          </Link>
          <Link to="/mypage/mychat/">
            <button className="btn-mid second-btn">내 채팅방</button>
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default MyPage;
