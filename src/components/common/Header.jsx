import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import ProfileModal from "../mypage/ProfileModal";
import logo from "../../assets/images/withconLogo.png";
import Notification from "../mypage/Notification";
import { useRecoilValue } from "recoil";
import { myInfoState } from "../../assets/constants/userRecoilState";
import { BsPersonFill } from "react-icons/bs";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [userdata, setUserdata] = useState(null);
  const myInfo = useRecoilValue(myInfoState);

  //로그인을 판단함
  useEffect(() => {
    const token = localStorage.getItem("withcon_token");
    if (token) {
      setUserdata(myInfo);
    }
  }, [myInfo]);

  //로그아웃을 실행함
  const logoutFunc = () => {
    localStorage.removeItem("withcon_token");
    localStorage.removeItem("favorites");
    sessionStorage.clear();
    setUserdata(null);
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
        <div className="container">
          <h1 className="title">
            <Link to="/">
              <img className="logo" src={logo} alt="위드콘" />
              <span className="mobile-hidden" aria-hidden="true">
                위드콘
              </span>
            </Link>
          </h1>
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
          <div className="login-area">
            {userdata ? (
              <div className="login-me">
                <button className="login-button" onClick={() => setOpen(!open)}>
                  {userdata.nickname}
                </button>
                <Notification />
              </div>
            ) : (
              <>
                <button
                  className="login-button"
                  onClick={() => navigate("/login")}
                >
                  <span className="login-text">로그인</span>
                  <BsPersonFill
                    className="member-img img-null"
                    alt="profileImg"
                  />
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
                info={JSON.stringify(userdata)}
              />
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
