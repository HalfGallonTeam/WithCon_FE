import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import ProfileModal from "../mypage/ProfileModal";
import logo from "../../assets/images/withconLogo.png";
import { favorites } from "../../assets/constants/atoms";
import { useSetRecoilState, useRecoilState } from "recoil";
import { userIn } from "../../assets/constants/atoms";

import Notification from "../mypage/Notification";

const Header = () => {
  const setFavoritePerformances = useSetRecoilState(favorites);
  const [isLogin, setIsLogin] = useRecoilState(userIn);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("테스터 님");
  const select = useRef(null);

  //로그인을 판단함
  useEffect(() => {
    const withconToken = localStorage.getItem("withcon_token");
    const kakaoToken = localStorage.getItem("kakao_token");
    if (withconToken || kakaoToken) {
      setIsLogin(true);
    }
  }, []);

  //로그아웃을 실행함
  const logoutFunc = () => {
    if (localStorage.getItem("kakao_token")) {
      setIsLogin(false);
      localStorage.removeItem("kakao_token");
    } else {
      setIsLogin(false);
      localStorage.removeItem("withcon_token");
      setFavoritePerformances(null);
    }
  };

  const keywordIn = (e) => {
    e.preventDefault();
    const keyword = e.target.keyword.value;
    if (!keyword) {
      window.alert("검색어를 입력하세요");
      return;
    }
    e.target.keyword.value = "";
    navigate(`/performance/search?category=all&keyword=${keyword}`);
    return;
  };

  return (
    <>
      <header className="header">
        <button
          onClick={() => {
            setIsLogin(true);
          }}
        >
          누르면 로그인됩니다
        </button>
        <div className="container">
          <h1 className="title">
            <Link to="/">
              <span className="mobile-hidden">위드콘</span>
              <img className="logo" src={logo} alt="위드콘" />
            </Link>
          </h1>
          <div className="login-area">
            {isLogin ? (
              <div className="login-me">
                <button className="login-button" onClick={() => setOpen(!open)}>
                  테스터 님
                </button>
                <Notification />
              </div>
            ) : (
              <>
                <button
                  className="login-button"
                  onClick={() => navigate("/login")}
                >
                  로그인
                </button>
                <button
                  className="login-button mobile-hidden"
                  onClick={() => navigate("/signup")}
                >
                  회원가입
                </button>
              </>
            )}
            {open && <ProfileModal logout={logoutFunc} modalOpen={setOpen} />}
          </div>
          <Navigation />
          <form className="search-area" onSubmit={keywordIn}>
            {/**<select
              className="filter-category"
              name="category"
              id="category-select"
            >
              <option value="all" ref={select}>
                전체
              </option>
              <option value="musical">뮤지컬</option>
              <option value="play">연극</option>
              <option value="concert">콘서트</option>
            </select>*/}
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
