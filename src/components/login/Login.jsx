import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="middle-container">
      <div className="container">
        <div className="login-box">
          <h1 className="title">위드콘</h1>
          <form className="login-form">
            <table>
              <tbody>
                <tr>
                  <td>아이디</td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
                <tr>
                  <td>비밀번호</td>
                  <td>
                    <input type="password" />
                  </td>
                </tr>
                <tr className="login-button-box">
                  <td colSpan="2">
                    <button className="login-button">로그인하기</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <button>
            <Link to="/Signup/">회원가입하기</Link>
          </button>
          <button>
            <Link to="/findpassword/">비밀번호찾기</Link>
          </button>
          <hr aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default Login;
