import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { myInfoState } from "../../assets/constants/userRecoilState";
import instance from "../../assets/constants/instance";
import axios from "axios";

const NaverLogin = () => {
  const setMyinfo = useSetRecoilState(myInfoState);
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
        console.log(response);
        const token = response.headers.authorization;
        localStorage.setItem("withcon_token", JSON.stringify(token));
        const response2 = await instance.get("/member/me");
        setMyinfo(response2.data);
        const response3 = await instance.get("/performance/favorite-id");
        localStorage.setItem("favorites", JSON.stringify(response3.data));
        navigate("/");
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
