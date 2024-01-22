const Profile = () => {
  return (
    <div className="main-container">
      <div className="profile-edit-form">
        <div className="title-logo">
          <h1 className="title">위드콘</h1>
          <img className="logo-img" src="/public/withconLogo.jpg" />
        </div>
        <div className="edit-img-container">
          <div className="profile-img">프로필 이미지</div>
          <button className="edit-img">프로필 이미지 변경</button>
        </div>
        <div className="edit-user-info">
          <div className="info-edit-container">
            <input
              type="text"
              className="info-edit-input"
              placeholder="닉네임"
            />
            <button className="info-edit-btn">닉네임 변경</button>
          </div>
          <div className="info-edit-container">
            <input
              type="text"
              className="info-edit-input"
              placeholder="OO구 OO동 12-3"
            />
            <button className="info-edit-btn">주소 변경</button>
          </div>
          <div className="info-edit-container">
            <input
              type="text"
              className="info-edit-input"
              placeholder="qwer1234@gmail.com"
            />
            <button className="info-edit-btn">이메일 재인증</button>
          </div>
          <div className="user-pw-edit">
            <button className="change-pw-btn">비밀번호 재설정</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
