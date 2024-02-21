import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../assets/constants/instance";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { myInfoState } from "../../assets/constants/userRecoilState";

const KakaoLogin = () => {
  const setMyinfo = useSetRecoilState(myInfoState);
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();
  let isRequestingToken = true;
  useEffect(() => {
    const getToken = async () => {
      if (!isRequestingToken) {
        console.log("이미 존재");
        return;
      }
      isRequestingToken = false;
      if (!code) {
        console.log("코드가 없습니다.");
        navigate("/");
        return;
      }
      try {
        const response = await axios.post("/api/auth/oauth2/login", {
          registrationId: "kakao",
          authorizationCode: code,
        });
        const accessToken = await response.headers.authorization;
        if (accessToken) {
          localStorage.setItem("withcon_token", JSON.stringify(accessToken));
          const response2 = await instance.get("/member/me");
          setMyinfo(response2.data);
          const response3 = await instance.get("/performance/favorite-id");
          localStorage.setItem("favorites", JSON.stringify(response3.data));
          navigate("/");
        }
      } catch (error) {
        console.error("잘못된 접근입니다.", error);
      }
    };
    getToken();
  }, [code]);
};

export default KakaoLogin;
