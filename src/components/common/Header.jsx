import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import ProfileModal from "../mypage/ProfileModal";
import logo from "../../assets/images/withconLogo.png";
import { favorites, userIn, userData } from "../../assets/constants/atoms";
import { useRecoilState } from "recoil";
//import SetFavorites from "../../assets/tools/setFavorites";
import instance from "../../assets/constants/instance";
import {
  isLoginState,
  myInfoState,
} from "../../assets/constants/userRecoilState";

import Notification from "../mypage/Notification";

const Header = () => {
  const [userdata, setUserdata] = useRecoilState(userData);
  const [favoritePerformance, setFavoritePerformance] =
    useRecoilState(favorites);
  // const [isLogin, setIsLogin] = useRecoilState(userIn);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [myInfo, setMyInfo] = useRecoilState(myInfoState);

  //로그인을 판단함
  useEffect(() => {
    const SetUserdata = async () => {
      try {
        // console.log("작동 setuser");
        const response = await instance.get("/member/me");
        // console.log(response);
        const data = await response.data;
        if (response.status === 200) {
          setUserdata(userData);
          setMyInfo(data);
        }
      } catch (error) {
        console.error(error, "에러");
      }
    };
    const token = localStorage.getItem("withcon_token");
    if (token) {
      setIsLogin(true);
      if (!userdata.id) {
        SetUserdata();
      }
      if (!favoritePerformance) {
        console.log("setfavorites");
        //SetFavorites();
      }
    }
  }, []);

  //로그아웃을 실행함
  const logoutFunc = () => {
    localStorage.removeItem("withcon_token");
    setIsLogin(false);
    setFavoritePerformance(null);
    setUserdata(null);
    //test
    setMyInfo(null);
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
        {/* <button
          onClick={() => {
            setIsLogin(true);
          }}
        >
          누르면 로그인됩니다
        </button> */}
        <div className="container">
          <h1 className="title">
            <Link to="/">
              <span className="mobile-hidden">위드콘</span>
              <img className="logo" src={logo} alt="위드콘" />
            </Link>
          </h1>
          <div className="login-area">
            {isLogin && myInfo ? (
              <div className="login-me">
                <button className="login-button" onClick={() => setOpen(!open)}>
                  {myInfo.nickname}
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
            {open && (
              <ProfileModal
                logout={logoutFunc}
                modalOpen={setOpen}
                info={{ id: "DataTransfer" }}
              />
            )}
          </div>
          <Navigation />
          <form className="search-area" onSubmit={keywordIn}>
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
