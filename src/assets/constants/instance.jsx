import axios from "axios";
import { useNavigate } from "react-router-dom";

const instance = axios.create({ baseURL: "/api" });

//헤더 인터셉트로 access_token 추가
instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = localStorage.getItem("withcon_token");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//만료 시 액세스 토큰 재발급 요청하기
instance.interceptors.response.use(
  async (response) => {
    if (response.data.status === 401) {
      if (response.data.errorCode === "ACCESS_TOKEN_EXPIRED") {
        const originalRequest = response.config;
        await tokenRefresh();
        originalRequest.headers["Authorization"] =
          localStorage.getItem("withcon_token");
        return axios(originalRequest);
      } else if (
        response.data.errorCode === "MISMATCH_REFRESH_TOKEN" ||
        response.data.errorCode === "NOT_EXIST_REFRESH_TOKEN"
      ) {
        localStorage.clear();
        window.alert("세션이 만료되었습니다. 로그인해주세요.");
        useNavigate("/login/");
        return;
      }
      return Promise.reject(response);
    } else {
      return response;
    }
  },
  async (error) => {
    const { response } = error;
    console.log(response);
    return Promise.reject(error);
  }
);

const tokenRefresh = async () => {
  try {
    const response = await instance.post("/auth/reissue");
    if (response.status === 200) {
      const token = response.headers.authorization;
      localStorage.setItem("withcon_token", JSON.stringify(token));
    }
  } catch (error) {
    console.error(error, "에러");
  }
};

export default instance;
