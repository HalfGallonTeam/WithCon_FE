import { Outlet, Link } from "react-router-dom";

const ConDetail = () => {
  return (
    <>
      <div>
        <button>
          <Link to="/:concert-title/">공연 상세정보</Link>
        </button>
        <button>
          <Link to="/:concert-title/chat/">채팅방 목록</Link>
        </button>
      </div>
      <Outlet />
    </>
  );
};

export default ConDetail;
