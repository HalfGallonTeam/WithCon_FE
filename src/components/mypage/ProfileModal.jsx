import { useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../../assets/constants/instance";
import { useRecoilState } from "recoil";
import { myInfoState } from "../../assets/constants/userRecoilState";
import { BsPersonFill } from "react-icons/bs";

const ProfileModal = (props) => {
  const [myInfo] = useRecoilState(myInfoState);
  const location = useLocation();
  const navigate = useNavigate();
  // const userdata = props.userdata;
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

  const logout = async () => {
    try {
      const response = await instance.post("/auth/logout");
      if (response.status === 200) {
        modalOpen(false);
        props.logout();
        const url = location.pathname;
        if (url.includes("mypage") || url.includes("profile")) {
          navigate("/");
        }
      } else {
        window.alert("로그아웃에 실패했습니다.");
        //로그아웃 실패 모달도 필요.
      }
    } catch (error) {
      console.error(error, "에러");
      window.alert("로그아웃에 실패했습니다.");
      //로그아웃 실패 모달도 필요.
    }
  };

  return (
    <div className="profile-modal-container" ref={toggleRef}>
      <div className="profile-modal-title">내 정보</div>
      <div className="profile-modal-info">
        {myInfo.profileImage === null ? (
          <BsPersonFill className="profile-modal-img-null" />
        ) : (
          <img
            className="profile-modal-img"
            src={myInfo.profileImage}
            alt="빈 이미지"
          />
        )}
        <span className="profile-modal-nickname">{myInfo.nickname}</span>
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
