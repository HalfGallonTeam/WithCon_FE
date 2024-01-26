import { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ProfileModal = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const modalOpen = props.modalOpen;
  const toggleRef = useRef(null);
  useEffect(() => {
    const toggleClose = (e) => {
      if (
        toggleRef.current &&
        !toggleRef.current.parentNode.contains(e.target)
      ) {
        modalOpen(false);
      }
    };
    document.addEventListener("click", toggleClose);
    return () => {
      document.removeEventListener("click", toggleClose);
    };
  }, []);
  const movePage = (root) => {
    modalOpen(false);
    navigate(root);
  };
  const logout = () => {
    modalOpen(false);
    props.logout();
    const url = location.pathname;
    if (url.includes("mypage") || url.includes("profile")) {
      navigate("/");
    }
  };

  return (
    <div className="profile-modal-container" ref={toggleRef}>
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
        onClick={() => movePage("/profile")}
      >
        프로필 수정
      </button>
      <button className="profile-modal-btn" onClick={() => movePage("/mypage")}>
        마이페이지
      </button>
      <button className="profile-modal-btn logout-btn" onClick={logout}>
        로그아웃
      </button>
    </div>
  );
};

export default ProfileModal;
