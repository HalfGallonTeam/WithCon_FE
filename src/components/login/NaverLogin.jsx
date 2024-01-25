import {
  VITE_NAVER_CLIENT_ID,
  NAVER_CALLBACK_URL,
} from "../../assets/constants/social_login";

const naverLogin = () => {
  const ClientID = VITE_NAVER_CLIENT_ID;
  const callbackURL = NAVER_CALLBACK_URL;
  var naver_id_login = new window.naver_id_login(ClientID, callbackURL);
  var state = naver_id_login.getUniqState();
  naver_id_login.setDomain(".service.com");
  naver_id_login.setState(state);
  naver_id_login.init_naver_id_login();
  return true;
};

export default naverLogin;
