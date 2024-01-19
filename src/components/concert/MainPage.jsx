import { Link } from "react-router-dom";
import AdCarousel from "./AdCarousel";
import ConLists from "./ConLists";

const MainPage = () => {
  return (
    <div className="container">
      <AdCarousel />
      <h2 className="concert-category">
        <Link to="/?category=concert">콘서트</Link>
      </h2>
      <div className="main-carousel-container">
        <div className="responsible-carousel scroll-x">
          <ConLists length="5" />
        </div>
      </div>
      <h2 className="concert-category">
        <Link to="/?category=musical">뮤지컬</Link>
      </h2>
      <div className="main-carousel-container">
        <div className="responsible-carousel scroll-x">
          <ConLists length="5" />
        </div>
      </div>
      <h2 className="concert-category">
        <Link to="/?category=play">연극</Link>
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
