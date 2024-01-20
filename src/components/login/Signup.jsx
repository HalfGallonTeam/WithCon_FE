import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const getFormData = (e) => {
    e.preventDefault();
    var formData = new FormData(e.currentTarget);
    // output as an object
    console.log(Object.fromEntries(formData));
  };

  return (
    <div className="middle-container">
      <div className="container">
        <div className="login-box">
          <h1 className="title">위드콘</h1>
          <form
            className="login-form"
            name="signup-form"
            action=""
            method="GET"
            onSubmit={getFormData}
          >
            <table>
              <tbody>
                <tr>
                  <td className="required">
                    <label htmlFor="username">아이디</label>
                  </td>
                  <td className="have-to-check">
                    <input
                      type="text"
                      id="username"
                      name="id"
                      autoComplete="username"
                    />
                    <button className="signup-check">중복확인</button>
                  </td>
                </tr>
                <tr>
                  <td className="required">
                    <label htmlFor="password">비밀번호</label>
                  </td>
                  <td>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      autoComplete="new-password"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="required">
                    <label htmlFor="password2">비밀번호 확인</label>
                  </td>
                  <td>
                    <input
                      type="password"
                      id="password2"
                      name="password2"
                      autoComplete="new-password"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="required">
                    <label htmlFor="email">이메일</label>
                  </td>
                  <td className="have-to-check">
                    <input type="email" id="email" name="email" />
                    <button className="signup-check">인증</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="nickname">닉네임</label>
                  </td>
                  <td>
                    <input type="text" id="nickname" name="nickname" />
                  </td>
                </tr>
              </tbody>
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
