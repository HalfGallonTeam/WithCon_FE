import { Link, useLocation, useNavigate } from "react-router-dom";
import AdCarousel from "./AdCarousel";
import ConLists from "./ConLists";
import { useEffect } from "react";

const MainPage = () => {
  const navigate = useNavigate();
  const getKeyword = useLocation().search;
  let category = new URLSearchParams(getKeyword).get("category");
  useEffect(() => {
    if (category) {
      navigate(`/performance/${category}`);
    }
  }, [category]);

  return (
    <div className="container">
      <AdCarousel />
      <h2 className="concert-category">
        <Link to="/performance/concert">콘서트</Link>
      </h2>
      <div className="main-carousel-container">
        <div className="responsible-carousel scroll-x">
          <ConLists length="5" />
        </div>
      </div>
      <h2 className="concert-category">
        <Link to="/performance/musical">뮤지컬</Link>
      </h2>
      <div className="main-carousel-container">
        <div className="responsible-carousel scroll-x">
          <ConLists length="5" />
        </div>
      </div>
      <h2 className="concert-category">
        <Link to="/performance/play">연극</Link>
      </h2>
      <div className="main-carousel-container">
        <div className="responsible-carousel scroll-x">
          <ConLists length="5" />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
