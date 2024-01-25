import { VITE_NAVER_CLIENT_ID } from "../../assets/constants/social_login";

const naverLogin = (setAtom) => {
  const ClientID = VITE_NAVER_CLIENT_ID;
  const callbackURL = "https://withcon.netlify.app/";
  var naver_id_login = new window.naver_id_login(ClientID, callbackURL);
  setAtom(() => naver_id_login);
  var state = naver_id_login.getUniqState();
  naver_id_login.setDomain(".service.com");
  naver_id_login.setState(state);
  naver_id_login.init_naver_id_login();
  return true;
};

export default naverLogin;
