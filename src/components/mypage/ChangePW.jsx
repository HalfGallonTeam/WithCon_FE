import { useNavigate } from "react-router-dom";

const ChangePW = () => {
  const navigate = useNavigate();
  const handleChangePW = (e) => {
    e.preventDefault();
    const now = e.target.password.value;
    const new2 = e.target.password2.value;
    const new3 = e.target.password3.value;
    if (new2 !== new3) {
      window.alert("새로운 비밀번호가 서로 일치하지 않습니다.");
      return;
    } else {
      window.alert("비밀번호가 변경되었습니다.");
      navigate("/profile/");
    }
  };

  const backToProfile = (e) => {
    e.preventDefault();
    navigate("/profile/");
  };

  return (
    <div className="container">
      <p className="location-desc">
        마이페이지 &gt; 프로필 확인 &gt; 비밀번호 변경
      </p>
      <div className="profile-edit-form password">
        <h2 className="change-password-title">비밀번호 변경</h2>
        <p className="desc">안전한 비밀번호로 내 정보를 보호하세요</p>
        <p className="desc">
          <span className="notice">
            다른 아이디/사이트에서 사용한 적 없는 비밀번호
          </span>
          <br />
          <span className="notice">이전에 사용한 적 없는 비밀번호</span>가
          안전합니다.
        </p>
        <div className="edit-user-info">
          <form className="info-edit-container" onSubmit={handleChangePW}>
            <input
              name="password"
              type="password"
              className="info-edit-input"
              placeholder="현재 비밀번호"
              autoComplete="new-password"
            />
            <input
              name="password2"
              type="password"
              className="info-edit-input"
              placeholder="새로운 비밀번호"
              autoComplete="new-password"
            />
            <input
              name="password3"
              type="password"
              className="info-edit-input"
              placeholder="새로운 비밀번호 확인"
              autoComplete="new-password"
            />
            <p className="desc">아래 이미지를 보이는 대로 입력해주세요</p>
            <table className="not-robot">
              <tr>
                <td rowSpan="2">
                  <img
                    src=""
                    alt="자동입력 방지문자"
                    className="not-robot-img"
                  />
                </td>
                <td>
                  <p className="not-robot-button">
                    <i className="bi bi-arrow-clockwise" aria-hidden="true"></i>
                    새로고침
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="not-robot-button">
                    <i className="bi bi-mic" aria-hidden="true"></i>
                    음성으로 듣기
                  </p>
                </td>
              </tr>
            </table>
            <input
              name="notrobot"
              type="text"
              className="info-edit-input"
              placeholder="자동입력 방지문자"
              autoComplete="off"
            />
            <div className="edit-buttons">
              <button className="edit-btn">수정</button>
              <button className="edit-btn" onClick={backToProfile}>
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePW;
