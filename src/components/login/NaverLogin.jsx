const naverLogin = (setToken) => {
  const ClientID = import.meta.env.VITE_NAVER_CLIENT_ID;
  const callbackURL = "https://withcon.netlify.app/";
  var naver_id_login = new window.naver_id_login(ClientID, callbackURL);

  //서비스와 callback url의 subdomain 불일치 문제 해결. 상태 토큰 비교를 위한 domain 설정
  naver_id_login.setDomain(".service.com");
  var state = naver_id_login.getUniqState();
  naver_id_login.setState(state);
  naver_id_login.init_naver_id_login();

  let access_token = naver_id_login.getAccessToken();
  if (access_token) {
    setToken(() => access_token);
    localStorage.setItem("naverTest", JSON.stringify(access_token));
  }
  return true;
};

export default naverLogin;
