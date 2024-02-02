import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../assets/constants/instance";
import kakaoBtn from "../../assets/images/kakao-login.png";
import naverBtn from "../../assets/images/naver-login.png";
import { getNaverToken, getWithconTokenFromNaver } from "./NaverLogin";

const Login = () => {
  const navigate = useNavigate();
  const [wrongPW, setWrongPW] = useState(false);

  //잘못된 접근 차단
  let isLogined = localStorage.getItem("withcon_token");
  useEffect(() => {
    if (isLogined) {
      isLogined = false;
      window.alert("이미 로그인된 사용자입니다");
      navigate("/");
    }
  }, []);

  //카카오 로그인
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = "https://withcon.netlify.app/kakao-login";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const kakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  //네이버 로그인
  useEffect(() => {
    var naver_id_login = new window.naver_id_login(
      import.meta.env.VITE_NAVER_CLIENT_ID,
      "http://localhost:5173/login"
    );
    const naverAccessToken = naver_id_login.oauthParams.access_token;
    if (naverAccessToken) {
      getWithconTokenFromNaver(naverAccessToken, navigate);
    } else {
      getNaverToken(naver_id_login);
    }
  }, []);

  //위드콘 로그인
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = e.target.username.value;
      const pw = e.target.password.value;
      const response = await instance.post("/user", {
        username: id,
        password: pw,
      });
      const dataObj = await response.data;
      if (dataObj.accessToken) {
        localStorage.setItem(
          "withcon_token",
          JSON.stringify(dataObj.accessToken)
        );
        navigate("/");
      } else if (dataObj.result === "NG") {
        setWrongPW(true);
      } else {
        window.alert("서버 response가 없으므로 id를 localStorage에 저장");
        localStorage.setItem("withcon_token", JSON.stringify(dataObj.username));
        navigate("/");
      }
    } catch (error) {
      console.error(error, "에러");
    }
  };

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
              method="POST"
              onSubmit={handleSubmit}
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
              {wrongPW && (
                <p className="login-desc">아이디 또는 비밀번호가 틀립니다.</p>
              )}
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
