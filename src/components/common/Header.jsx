import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileModal from "../mypage/ProfileModal";
import logo from "../../assets/images/withconLogo.png";
import { KakaoLogout } from "../login/KakaoLogin";

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("테스터 님");

  //로그인을 판단함
  useEffect(() => {
    let withconToken = localStorage.getItem("withcon_token");
    const kakaoToken = localStorage.getItem("kakao_token");
    if (withconToken || kakaoToken) {
      setIsLogin(true);
    }
  }, []);

  //로그아웃을 실행함
  const logoutFunc = () => {
    if (localStorage.getItem("kakao_token")) {
      setIsLogin(false);
      KakaoLogout();
      localStorage.removeItem("kakao_token");
    } else {
      setIsLogin(false);
      localStorage.removeItem("withcon_token");
    }
  };

  const keywordIn = (e) => {
    e.preventDefault()
    const category = e.target.category.value
    const keyword = e.target.keyword.value;
    if (!keyword) {
      e.preventDefault();
      window.alert("검색어를 입력하세요");
      return;
    }
    navigate(`/search?category=${category}&keyword=${keyword}`);
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <h1 className="title">
            <Link to="/">
              위드콘
              <img className="logo" src={logo} alt="로고" />
            </Link>
          </h1>
          <div className="login-area">
            <button onClick={() => setIsLogin(true)}>
              !누르면 로그인됩니다.!
            </button>
            <button
              className="login-button"
              onClick={() => {
                isLogin ? setOpen(!open) : navigate("/login/");
              }}
            >
              {isLogin ? userName : "로그인하세요"}
            </button>
            {open === true ? (
              <ProfileModal logout={logoutFunc} modalOpen={setOpen} />
            ) : (
              <></>
            )}
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
