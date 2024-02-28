import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

const MyPageComponent = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("likes");
  const categoryClick = () => {
    if (category === "likes") {
      setCategory("chat");
      navigate(`/mypage/mychat`);
    } else if (category === "chat") {
      setCategory("likes");
      navigate(`/mypage`);
    }
  };

  return (
    <div className="mypage-container">
      <div className="title-container">
        <div className="breadcrumb-container">
          {category === "likes" ? (
            <>
              <span className="location-desc">마이페이지 &gt; 찜한 공연</span>
            </>
          ) : (
            <>
              <span className="location-desc">마이페이지 &gt; 나의 채팅방</span>
            </>
          )}
        </div>
        <div className="btn-container">
          <button onClick={categoryClick}>
            {category === "likes" ? "내 채팅방 보기" : "찜한 공연 보기"}
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default MyPageComponent;
