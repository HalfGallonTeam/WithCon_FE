import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { access_token } from "../../assets/constants/atoms";
import {
  VITE_NAVER_CLIENT_ID,
  NAVER_CALLBACK_URL,
} from "../../assets/constants/social_login";
import ProfileModal from "../mypage/ProfileModal";
import logo from "../../assets/images/withconLogo.png";

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("테스터 님");

  //네이버 소셜 로그인을 바탕으로 토큰 받아오기.
  const [accessToken, setAccessToken] = useRecoilState(access_token);
  useEffect(() => {
    //로그인을 판단함
    let withconToken = localStorage.getItem("withcon_token");
    if (withconToken) {
      setIsLogin(true);
    } else {
      //로그인이 안 되었을 때 네이버로그인을 판단함.
      var naver_id_login = new window.naver_id_login(
        VITE_NAVER_CLIENT_ID,
        NAVER_CALLBACK_URL
      );
      const naverAccessToken = naver_id_login.oauthParams.access_token;
      if (naverAccessToken) {
        console.log("naver_access_token", naverAccessToken);
        console.log(
          "네이버 access token이 존재하므로, 이 토큰을 backend에 POST로 전달합니다. 그리고 response를 받아, '위드콘'의 access token과 refresh token을 전역 상태(recoil atom)에 저장합니다. 이 과정은 보내는 데이터가 id 및 pw가 아닐 뿐 로그인 동작과 동일할 것으로 예상됩니다."
        );
        setAccessToken(() => "가공된" + naverAccessToken);
        localStorage.setItem(
          "withcon_token",
          JSON.stringify("가공된" + naverAccessToken)
        );
        window.alert("로컬스토리지에 토큰이 저장되었습니다.");
        setIsLogin(true);
      } else {
        console.log("naver_access_token이 없습니다");
      }
    }
  }, []);

  //로그아웃을 실행함
  const logoutFunc = () => {
    setIsLogin(false);
    localStorage.removeItem("withcon_token");
  };

  /**
   * 판단 기준이 recoil atom이라면,
   * //로그인을 판단함
   * let withconToken = useRecoilValue(access_token)
   * if(withconToken) {setIsLogin(true)}
   * //로그아웃을 실행함
   * const resetAccessToken = useResetRecoilState(access_token)
   * const logoutFunc = () => {
   *  setIsLogin(false)
   *  resetAccessToken()
   * }
   */

  const keywordIn = (e) => {
    const keyword = e.target.keyword.value;
    if (!keyword) {
      e.preventDefault();
      window.alert("검색어를 입력하세요");
      return;
    }
    navigate("/search/");
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
