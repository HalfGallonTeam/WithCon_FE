import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "../../assets/constants/instance";
import AdCarousel from "./AdCarousel";
import ConcertCard from "./ConcertCard";

const ConLists = (props) => {
  const [infos, setInfos] = useState([]);
  const concertCards = [];

  useEffect(() => {
    const getInfos = async () => {
      try {
        const response = await instance.get(
          `/performance-best?category=${props.category}`
        );
        const datas = await response.data;
        setInfos(datas);
      } catch (error) {
        console.error(error, "에러");
      }
    };
    getInfos();
  }, []);

  infos.map((info, index) => {
    concertCards.push(<ConcertCard info={info} key={index} />);
  });

  return (
    <>
      <div className="container">
        <div className="concert-list">{concertCards}</div>
      </div>
    </>
  );
};

const MainPage = () => {
  return (
    <>
      <AdCarousel />
      <div className="container">
        <h2 className="concert-category">
          <Link to="/performance?category=concert">콘서트</Link>
        </h2>
        <div className="main-carousel-container">
          <div className="responsible-carousel scroll-x">
            <ConLists category="concert" />
          </div>
        </div>
        <h2 className="concert-category">
          <Link to="/performance?category=musical">뮤지컬</Link>
        </h2>
        <div className="main-carousel-container">
          <div className="responsible-carousel scroll-x">
            <ConLists category="musical" />
          </div>
        </div>
        <h2 className="concert-category">
          <Link to="/performance?category=play">연극</Link>
        </h2>
        <div className="main-carousel-container">
          <div className="responsible-carousel scroll-x">
            <ConLists category="play" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
