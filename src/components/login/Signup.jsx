import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="middle-container">
      <div className="container">
        <div className="login-box">
          <h1 className="title">위드콘</h1>
          <form className="login-form">
            <table>
              <tr>
                <td className="required">아이디</td>
                <td>
                  <input
                    type="text"
                    name="id"
                    placeholder="아이디를 입력하세요"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className="required">비밀번호</td>
                <td>
                  <input
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력하세요"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className="required">비밀번호 확인</td>
                <td>
                  <input
                    type="password"
                    name="password2"
                    placeholder="비밀번호를 입력하세요"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td className="required">이메일</td>
                <td>
                  <input
                    type="email"
                    name="email"
                    placeholder="이메일을 입력하세요"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>닉네임</td>
                <td>
                  <input
                    type="text"
                    name="nickname"
                    placeholder="닉네임을 입력하세요"
                  />
                </td>
              </tr>
            </table>
            <button className="login-button">회원가입하기</button>
          </form>
          <hr aria-hidden="true" />
          <p className="login-desc">
            아이디가 있으신가요?{" "}
            <Link to="/login/">
              <span style={{ fontWeight: "700" }}>로그인하기</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
