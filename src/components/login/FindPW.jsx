import { useState } from "react";
import { Link } from "react-router-dom";

const FindPW = () => {
  const [modal, setModal] = useState(false);
  const onModal = () => {
    setModal(true);
  };

  return (
    <div className="middle-container">
      <div className="container">
        <div className="login-box">
          <h1 className="title">위드콘</h1>
          {!modal ? (
            <form
              className="login-form"
              name="findpw-form"
              action=""
              method="GET"
              onSubmit={onModal}
            >
              <p className="login-desc">
                비밀번호를 찾으려는 아이디를 입력하세요
              </p>
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
                      <label htmlFor="email">이메일</label>
                    </td>
                    <td>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        placeholder="이메일을 입력하세요"
                        required
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button className="login-button">비밀번호 찾기</button>
            </form>
          ) : (
            <div className="find-password-modal">
              <p>
                등록하신 이메일로 <br />
                비밀번호를 보냈습니다
              </p>
              <button className="find-password-modal-btn">
                <Link to="/login/">확인</Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindPW;
