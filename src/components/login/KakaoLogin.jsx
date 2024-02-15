import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../assets/constants/instance";
import axios from "axios";

const KakaoLogin = () => {
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
