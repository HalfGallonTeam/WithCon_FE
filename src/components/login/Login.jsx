import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { myInfoState } from "../../assets/constants/userRecoilState";
import kakaoBtn from "../../assets/images/kakao-login.png";
import naverBtn from "../../assets/images/naver-login.png";
import axios from "axios";
import instance from "../../assets/constants/instance";
import Loading from "../common/Loading";

const Login = () => {
  const navigate = useNavigate();
  const [wrongPW, setWrongPW] = useState(false);
  const [naverURI, setNaverURI] = useState("");
  const setMyinfo = useSetRecoilState(myInfoState);
  const [loading, setLoading] = useState(false);

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
  const REDIRECT_URI = "http://localhost:5173/kakao-login";
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const kakaoLogin = () => {
    window.location.href = kakaoURL;
  };
  //네이버 로그인
  useEffect(() => {
    const getUniqState = () => {
      var stat_str = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
      return stat_str;
    };
    let uri = "https://nid.naver.com/oauth2.0/authorize";
    uri += "?response_type=code";
    uri += "&client_id=" + import.meta.env.VITE_NAVER_CLIENT_ID;
    uri += "&redirect_uri=http://localhost:5173/naver-login";
    uri += "&state=" + getUniqState();
    setNaverURI(uri);
  }, []);

  //위드콘 로그인
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const id = e.target.username.value;
      const pw = e.target.password.value;
      const response = await axios.post("/api/auth/login", {
        username: id,
        password: pw,
      });
      console.log(response);
      const token = response.headers.authorization;
      localStorage.setItem("withcon_token", JSON.stringify(token));
      const response2 = await instance.get("/member/me");
      setMyinfo(response2.data);
      const response3 = await instance.get("/performance/favorite-id");
      localStorage.setItem("favorites", JSON.stringify(response3.data));
      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(true);
      if (error.response.status === 400) {
        console.error(error, "에러");
        setWrongPW(true);
        setLoading(false);
        return;
      } else {
        window.alert(
          "서버 연결 상태가 좋지 않습니다. 잠시 후 다시 시도해주세요."
        );
      }
    }
  };

  return (
    <>
      <div className="middle-container">
        {loading ? <Loading /> : null}
        <div className="container">
          <div className="login-box">
            <h1 className="title" onClick={() => navigate("/")}>
              위드콘
            </h1>
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
            <span>아직 회원이 아니신가요? </span>
            {/* <span aria-hidden="true">|</span> */}
            <Link to="/signup/"> 회원가입하기</Link>
            {/* <Link to="/findpassword/">비밀번호찾기</Link> */}
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
                <a href={naverURI} id="naver_id_login_anchor">
                  <img
                    src={naverBtn}
                    title="네이버 아이디로 로그인"
                    style={{ height: "40px", margin: "10px 4px" }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
