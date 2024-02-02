import axios from "axios";

let isNaverToken = false;
const getWithconTokenFromNaver = async (token, navigate) => {
  if (isNaverToken) {
    console.log("네이버 로그인이 진행중입니다");
    return;
  }
  try {
    isNaverToken = true;
    const response = await axios.post("http://localhost:8000/user", {
      naver_access_token: token,
    });
    const dataObj = await response.data;
    console.log(dataObj);
    if (dataObj.accessToken) {
      localStorage.setItem(
        "withcon_token",
        JSON.stringify(dataObj.accessToken)
      );
      document.cookie = `withcon_refresh=${dataObj.refreshToken};secure`;
      navigate("/");
    } else if (dataObj.result === "NG") {
      window.alert("회원가입이 되지 않은 사람입니다. 회원가입하세요.");
    } else {
      window.alert(
        "서버 response가 없으므로 naver_access_token을 localStorage에 저장"
      );
      localStorage.setItem("withcon_token", JSON.stringify(token));
      document.cookie = `withcon_refresh=${token.length};secure`;
      navigate("/");
    }
  } catch (err) {
    console.log(err);
  }
};

const getNaverToken = (variable) => {
  const naver_id_login = variable;
  var state = naver_id_login.getUniqState();
  naver_id_login.setDomain(".service.com");
  naver_id_login.setState(state);
  naver_id_login.init_naver_id_login();
  return true;
};

export { getWithconTokenFromNaver, getNaverToken };
