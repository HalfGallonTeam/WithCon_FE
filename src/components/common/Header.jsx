import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileModal from "../mypage/ProfileModal";
import logo from "../../assets/images/withconLogo.png";

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("로그인하세요");
  const loginChange = () => {
    if (isLogin) {
      setIsLogin(false);
      setUserName("로그인하세요");
    } else {
      setIsLogin(true);
      setUserName("테스터 님");
    }
  };

  const keywordIn = (e) => {
    const keyword = e.target.keyword.value;
    if (!keyword) {
      e.preventDefault();
      window.alert("검색어를 입력하세요");
      return;
    }
    navigate("/search/keyword");
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <Link to="/">
            <h1 className="title">
              위드콘
              <img className="logo" src={logo} alt="로고" />
            </h1>
          </Link>
          <div className="login-area">
            <button onClick={loginChange}>!로그인 테스트용 버튼입니다!</button>
            <button
              className="login-button"
              onClick={() => {
                isLogin ? setOpen(!open) : navigate("/login/");
              }}
            >
              {userName}
            </button>
            {open === true ? <ProfileModal /> : <></>}
          </div>
          <form className="search-area" onSubmit={keywordIn}>
            <select
              className="filter-category"
              name="category"
              id="category-select"
            >
              <option value="all">전체</option>
              <option value="musical">뮤지컬</option>
              <option value="play">연극</option>
              <option value="concert">콘서트</option>
            </select>
            <div className="search-keyword-box">
              <input
                className="search-keyword-input"
                type="text"
                name="keyword"
                placeholder="관심있는 공연을 검색해보세요"
              />
              <button className="submit">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
        </div>
      </header>
    </>
  );
};

export default Header;
