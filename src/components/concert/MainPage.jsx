import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "../../assets/constants/instance";
import AdCarousel from "./AdCarousel";
import ConcertCard from "./ConcertCard";

const ConListBests = (props) => {
  const [infos, setInfos] = useState([]);
  const category = props.category;
  const categoryKR = {
    concert: "콘서트",
    musical: "뮤지컬",
    play: "연극",
  };

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

  const concertCards = [];
  infos.map((info, index) => {
    concertCards.push(<ConcertCard info={info} key={index} />);
  });

  return (
    <>
      <h2 className="concert-category">
        <Link to={`/performance?category=${category}`}>
          {categoryKR[category]}
        </Link>
      </h2>
      <div className="main-carousel-container">
        <div className="responsible-carousel scroll-x">
          <div className="container">
            <div className="concert-list">{concertCards}</div>
          </div>
        </div>
      </div>
    </>
  );
};

const MainPage = () => {
  const categories = ["concert", "musical", "play"];
  const bestLists = [];
  categories.map((category) => {
    bestLists.push(<ConListBests category={category} key={category} />);
  });

  return (
    <>
      <AdCarousel />
      <div className="container">{bestLists}</div>
    </>
  );
};

export default MainPage;
