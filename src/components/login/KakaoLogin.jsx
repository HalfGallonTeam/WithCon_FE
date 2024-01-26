import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoLogin = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = "http://localhost:5173/kakao-login";
  const navigate = useNavigate();
  let isRequestringToken = false;
  const getToken = async (code) => {
    if (isRequestringToken) {
      console.log("이미 진행");
      return;
    }
    try {
      isRequestringToken = true;
      const response = await axios.post(
        `https://kauth.kakao.com/oauth/token?
grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );
      const data = response.data;
      console.log(data);
      if (data.access_token) {
        localStorage.setItem("kakao_token", JSON.stringify(data.access_token));
      }
      navigate("/");
    } catch (error) {
      console.error(`Error token`, error);
      throw error;
    }
    //2. 처음에는 중복사용이 안됨 하지만 두번째 로그인부터 중복사용
    //비동기 형식으로 토큰 요청을 했기때문에 같은 인가 코드가 사용될 수 있다고함.
    // 그래서 요청 중복 방지를 위해 플래그 사용
    //isRequestingToken 변수는 현재 토큰 요청이 진행 중인지 여부를 나타내는 플래그로 사용되며, 중복 요청을 방지. 그리고 마지막에 플래그를 해제하여 다음 요청을 허용하게 횜
    isRequestringToken = false;
    //1. 인가코드를 중복사용해 koe320오류 그래서 인가코드 받고 토큰 요청시 홈으로 이동
    // navigate("/");
  };

  useEffect(() => {
    if (code) {
      getToken(code);
    }
  }, [code]);
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
