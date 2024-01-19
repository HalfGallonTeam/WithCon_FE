import { Link } from "react-router-dom";
import kakaoBtn from "../../assets/images/kakao-login.png";
import naverBtn from "../../assets/images/naver-login.png";

const Login = () => {
  return (
    <div className="middle-container">
      <div className="container">
        <div className="login-box">
          <h1 className="title">위드콘</h1>
          <form className="login-form" name="login-form" action="" method="GET">
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
          <img
            src={kakaoBtn}
            title="카카오 로그인 버튼"
            style={{ height: "40px", margin: "10px 4px" }}
          />
          <img
            src={naverBtn}
            title="네이버 아이디로 로그인"
            style={{ height: "40px", margin: "10px 4px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
