import { useEffect } from "react";
import { Link } from "react-router-dom";
import kakaoBtn from "../../assets/images/kakao-login.png";
import naverBtn from "../../assets/images/naver-login.png";

const naverLogin = () => {
  const ClientID = "EbpEEUuGnuKMtgt1URzI";
  const callbackURL = "https://monumental-maamoul-ad99a8.netlify.app/";
  var naver_id_login = new window.naver_id_login(ClientID, callbackURL);
  //팝업 형태의 로그인 인증
  naver_id_login.setPopup();
  //callback url과 로그인 버튼이 있는 url의 subdomain 불일치 문제 해결
  //상태 토큰은 !!!"cookie로 전달"!!!!하므로, 양쪽 domain에서 cookie를 참조해야 함.
  //상태 토큰 비교를 위한 domain 설정
  naver_id_login.setDomain(".service.com");
  var state = naver_id_login.getUniqState();
  naver_id_login.setState(state);
  naver_id_login.init_naver_id_login();
  console.log(naver_id_login.getAccessToken());
  /**
    <!-- callback페이지 처리 스크립트 -->
    <script type="text/javascript">
      // 네이버 사용자 프로필 조회 이후 프로필 정보를 처리할 callback function
      function naverSignInCallback() {
        // naver_id_login.getProfileData('프로필항목명');
        // 프로필 항목은 개발가이드를 참고하시기 바랍니다.
        alert(naver_id_login.getProfileData('email'));
        alert(naver_id_login.getProfileData('nickname'));
        alert(naver_id_login.getProfileData('age'));
      }
      // 네이버 사용자 프로필 조회
      naver_id_login.get_naver_userprofile("naverSignInCallback()");
    </script>
*/
  return;
};

const Login = () => {
  useEffect(() => {
    naverLogin();
  }, []);

  return (
    <>
      <div className="middle-container">
        <div className="container">
          <div className="login-box">
            <h1 className="title">위드콘</h1>
            <form
              className="login-form"
              name="login-form"
              action=""
              method="GET"
            >
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="username">아이디</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="username"
                        name="id"
                        autoComplete="username"
                        placeholder="아이디를 입력하세요"
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="password">비밀번호</label>
                    </td>
                    <td>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        placeholder="비밀번호를 입력하세요"
                        required
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="login-button">로그인하기</button>
            </form>
            <Link to="/signup/">회원가입하기</Link>
            <span aria-hidden="true">|</span>
            <Link to="/findpassword/">비밀번호찾기</Link>
            <hr aria-hidden="true" />
            <p className="login-desc">소셜아이디로 간편로그인</p>
            <div className="social-login-area">
              <div id="kakao_id_login">
                <img src={kakaoBtn} title="카카오톡 아이디로 로그인" />
              </div>
              <div id="naver_id_login">
                <img src={naverBtn} title="네이버 아이디로 로그인" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
