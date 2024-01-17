import { Outlet, Link } from "react-router-dom";

const MyPage = () => {
  return (
    <>
      <div>
        <button>
          <Link to="/mypage/">찜한공연</Link>
        </button>
        <button>
          <Link to="/mypage/mychat/">내 채팅방</Link>
        </button>
        <button>
          <Link to="/mypage/profile/">프로필 변경</Link>
        </button>
      </div>
      <Outlet />
    </>
  );
};

export default MyPage;
