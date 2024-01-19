const Profile = () => {
  return (
    <div className="main-container">
      <div className="profile-edit-form">
        <div className="edit-img-container">
          <img />
          <button className="edit-img">프로필 이미지 변경</button>
        </div>
        <div className="edit-user-info">
          <div className="info-edit-container">
            <input type="text" className="info-edit-input" />
            <button className="info-edit-btn">닉네임 변경</button>
          </div>
          <div className="info-edit-container">
            <input type="text" className="info-edit-input" />
            <button className="info-edit-btn">닉네임 변경</button>
          </div>
          <div className="info-edit-container">
            <input type="text" className="info-edit-input" />
            <button className="info-edit-btn">닉네임 변경</button>
          </div>
          <div className="user-pw-edit">
            <button className="info-edit-btn change-pw-btn">
              비밀번호 재설정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
