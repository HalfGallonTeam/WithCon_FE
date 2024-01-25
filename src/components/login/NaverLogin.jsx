const getNaverToken = (variable) => {
  const naver_id_login = variable;
  var state = naver_id_login.getUniqState();
  naver_id_login.setDomain(".service.com");
  naver_id_login.setState(state);
  naver_id_login.init_naver_id_login();
  return true;
};

export default getNaverToken;
