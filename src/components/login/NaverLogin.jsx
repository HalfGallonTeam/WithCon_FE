import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const NaverLogin = () => {
  let isRunning = true;
  const navigate = useNavigate();
  const url = useLocation();
  const urlSearch = new URLSearchParams(url.search);
  const code = urlSearch.get("code");
  const err = urlSearch.get("error");

  useEffect(() => {
    const getWithconTokenFromNaver = async () => {
      if (!isRunning) return;
      isRunning = false;
      if (!code && !err) {
        window.alert("잘못된 접근입니다.");
        navigate("/");
        return;
      } else if (err) {
        window.alert("API요청에 실패했습니다. 다시 시도해주세요");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.post("/api/auth/oauth2/login", {
          registrationId: "naver",
          authorizationCode: code,
        });
        const token = response.headers["Authorization"].split(" ")[1];
        if (token) {
          localStorage.setItem("withcon_token", JSON.stringify(token));
          navigate("/");
        } else {
          window.alert("네이버 로그인에 실패했습니다");
          navigate("/login");
        }
      } catch (error) {
        console.error(error, "에러");
        window.alert(
          "서버 연결 상태가 좋지 않습니다. 잠시 후 다시 시도해주세요."
        );
        navigate("/login");
      }
    };
    getWithconTokenFromNaver();
  }, []);

  return <div></div>;
};

export default NaverLogin;
