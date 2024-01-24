import { useEffect } from "react";
import { Link } from "react-router-dom";
import kakaoBtn from "../../assets/images/kakao-login.png";
import naverBtn from "../../assets/images/naver-login.png";

const naverLogin = () => {
  const ClientID = "EbpEEUuGnuKMtgt1URzI";
  const callbackURL = "https://withcon.netlify.app/";
  var naver_id_login = new window.naver_id_login(ClientID, callbackURL);
  //서비스와 callback url의 subdomain 불일치 문제 해결. 상태 토큰 비교를 위한 domain 설정
  naver_id_login.setDomain(".service.com");
  var state = naver_id_login.getUniqState();
  naver_id_login.setState(state);
  naver_id_login.init_naver_id_login();

  return;
};
const Login = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = "http://localhost:5173/kakao-login";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const kakaoLogin = () => {
    window.location.href = kakaoURL;
  };
  useEffect(() => {
    naverLogin();
  }, []);

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
