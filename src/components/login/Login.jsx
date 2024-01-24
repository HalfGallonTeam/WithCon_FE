import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { access_token } from "../../assets/constants/atoms";
import kakaoBtn from "../../assets/images/kakao-login.png";
import naverBtn from "../../assets/images/naver-login.png";
import naverLogin from "./NaverLogin";

const Login = () => {
  //카카오 로그인
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = "http://localhost:5173/kakao-login";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const kakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  //네이버 로그인
  const [accessToken, setAccessToken] = useRecoilState(access_token);
  const [naverAccessToken, setNaverAccessToken] = useState(null);
  useEffect(() => {
    naverLogin(setNaverAccessToken);
  }, []);
  useEffect(() => {
    if (naverAccessToken) {
      console.log("naver_access_token", naverAccessToken);
      console.log(
        "네이버 access token이 존재하므로, 이 토큰을 backend에 POST로 전달합니다. 그리고 response를 받아, '위드콘'의 access token과 refresh token을 전역 상태(recoil atom)에 저장합니다. 이 과정은 보내는 데이터가 id 및 pw가 아닐 뿐 로그인 동작과 동일할 것으로 예상됩니다."
      );
      setAccessToken(() => "가공된" + naverAccessToken);
    }
  }, [naverAccessToken]);
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("withcon_token", accessToken);
      window.alert("로컬스토리지에 토큰이 저장되었습니다.");
    }
  }, [accessToken]);

  return (
    <>
      <div className="middle-container">
        <div className="container">
          <div className="login-box">
            <h1 className="title">위드콘</h1>
            <form
              className="login-form"
              name="login-form"
              action=""
              method="GET"
            >
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="username">아이디</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="username"
                        name="id"
                        autoComplete="username"
                        placeholder="아이디를 입력하세요"
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="password">비밀번호</label>
                    </td>
                    <td>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        placeholder="비밀번호를 입력하세요"
                        required
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="login-button">로그인하기</button>
            </form>
            <Link to="/signup/">회원가입하기</Link>
            <span aria-hidden="true">|</span>
            <Link to="/findpassword/">비밀번호찾기</Link>
            <hr aria-hidden="true" />
            <p className="login-desc">소셜아이디로 간편로그인</p>
            <div className="social-login-box">
              <div className="kakao-login" onClick={kakaoLogin}>
                <img
                  src={kakaoBtn}
                  title="카카오 로그인 버튼"
                  style={{ height: "40px", margin: "10px 4px" }}
                />
              </div>
              <div id="naver_id_login">
                <img
                  src={naverBtn}
                  title="네이버 아이디로 로그인"
                  style={{ height: "40px", margin: "10px 4px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
