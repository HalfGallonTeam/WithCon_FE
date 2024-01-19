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
            <form className="login-form" onSubmit={onModal}>
              <p className="login-desc">
                비밀번호를 찾으려는 아이디를 입력하세요
              </p>
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
