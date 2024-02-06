import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../../assets/constants/instance";

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
        const response = await instance.post("/auth/oauth2/login", {
          registrationId: "naver",
          authorizationCode: code,
        });
        const datas = await response.data;
        if (datas.accessToken) {
          localStorage.setItem(
            "withcon_token",
            JSON.stringify(datas.accessToken)
          );
          navigate("/");
        } else if (datas.result === "NG") {
          window.alert("통신 상태가 좋지 않습니다. 잠시 후 다시 시도해주세요");
          navigate("/login");
        } else {
          window.alert(
            "서버 response가 없으므로 naver_access_token을 localStorage에 저장"
          );
          localStorage.setItem("withcon_token", JSON.stringify(code));
          navigate("/");
        }
      } catch (error) {
        console.error(error, "에러");
      }
    };
    getWithconTokenFromNaver();
  }, []);

  return <div></div>;
};

export default NaverLogin;
