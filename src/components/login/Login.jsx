import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <p>로그인 페이지</p>
      <button>
        <Link to="/Signup/">회원가입하기</Link>
      </button>
      <button>
        <Link to="/findpassword/">비밀번호찾기</Link>
      </button>
    </div>
  );
};

export default Login;
