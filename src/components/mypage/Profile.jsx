import { Link } from "react-router-dom";

const Profile = () => {
  //모바일 설정 기준으로 세팅 > min-width 설정을 통해서 큰 화면이 보이도록.
  const submitNickname = (e) => {
    e.preventDefault();
    const nick = e.target.nickname.value;
    window.alert("닉네임이 " + nick + "으로 변경되었습니다.");
  };
  const submitEmail = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    window.alert("이메일이 " + email + "으로 변경되었습니다.");
  };
  const submitPhoneNumber = (e) => {
    e.preventDefault();
    const phone = e.target.phone.value;
    window.alert("전화번호가 " + phone + "으로 변경되었습니다.");
  };
  return (
    <>
      <div className="container">
        <p className="location-desc">마이페이지 &gt; 프로필 변경</p>
        <div className="profile-edit-form">
          <div className="edit-img-container">
            <img
              className="profile-img"
              src="
              https://dummyimage.com/100x100/E6E6E6/0011ff"
              alt="프로필 이미지"
            />
            <div className="edit-buttons">
              <button className="edit-btn">사진 변경</button>
              <button className="edit-btn">적용</button>
            </div>
          </div>
          <div className="edit-user-info">
            <form className="info-edit-container" onSubmit={submitNickname}>
              <i className="bi bi-person" aria-hidden="true"></i>
              <input
                name="nickname"
                type="text"
                className="info-edit-input"
                defaultValue="닉네임"
              />
              <button className="edit-btn">수정</button>
            </form>
            <form className="info-edit-container" onSubmit={submitEmail}>
              <i className="bi bi-envelope" aria-hidden="true"></i>
              <input
                name="email"
                type="text"
                className="info-edit-input"
                defaultValue="qwer1234@gmail.com"
              />
              <button className="edit-btn">수정</button>
            </form>
            <form className="info-edit-container" onSubmit={submitPhoneNumber}>
              <i className="bi bi-phone" aria-hidden="true"></i>
              <input
                name="phone"
                type="text"
                className="info-edit-input"
                defaultValue="010-1234-5678"
              />
              <button className="edit-btn">수정</button>
            </form>
            <div className="user-pw-edit">
              <Link to="/profile/changepassword/" className="edit-btn">
                비밀번호 재설정
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
