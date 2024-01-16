import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div>
        <button>
          <Link to="/mypage/">마이페이지</Link>
        </button>
        <button>
          <Link to="/login/">로그인하기</Link>
        </button>
        <div>위드콘 헤더입니다</div>
        <input type="text" placeholder="검색창이에요" />
      </div>
      <hr />
    </>
  );
};

export default Header;
