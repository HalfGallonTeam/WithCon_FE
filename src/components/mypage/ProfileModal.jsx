import { Link, useNavigate } from "react-router-dom";

const ProfileModal = () => {
  const navigate = useNavigate();
  return (
    <div className="profile-modal-container">
      <div className="profile-modal-title">내 정보</div>
      <div className="profile-modal-info">
        <img
          className="profile-modal-img"
          src="https://dummyimage.com/50x50/E6E6E6/0011ff"
          alt="빈 이미지"
        />
        <span className="profile-modal-nickname">테스터</span>
      </div>

      <button
        className="profile-modal-btn"
        onClick={() => navigate("/profile")}
      >
        프로필 수정
      </button>
      <button className="profile-modal-btn" onClick={() => navigate("/mypage")}>
        마이페이지
      </button>
      <button className="profile-modal-btn logout-btn">로그아웃</button>
    </div>
  );
};

export default ProfileModal;
