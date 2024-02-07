import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../assets/constants/instance";

const KakaoLogin = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();
  let isRequestingToken = false;
  const getToken = async () => {
    if (isRequestingToken) return;
    try {
      isRequestingToken = true;
      const response = await instance.post("/auth/oauth2/login", {
        registrationId: "kakao",
        authorizationCode: code,
      });
      const data = await response.data;
      if (data.accessToken) {
        localStorage.setItem("withcon_token", data.accessToken);
        navigate("/");
      }
    } catch (error) {
      console.error("잘못된 접근입니다.", error);
    }
    isRequestingToken = false;
  };
  useEffect(() => {
    getToken();
  }, [code]);
  console.log(code);
};

export default KakaoLogin;

export const KakaoLogout = () => {
  const accessToken = localStorage.getItem("kakao_token");
  const logout = async () => {
    try {
      const response = await axios.get(
        `https://kapi.kakao.com/v1/user/logout`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(`Error get info`, error);
    }
  };
  return logout();
};
