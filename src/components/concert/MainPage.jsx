import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "../../assets/constants/instance";
import AdCarousel from "./AdCarousel";
import ConcertCard from "./ConcertCard";

const MainPage = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites"))
  );
  const [concert, setConcert] = useState([0, 0, 0, 0, 0]);
  const [musical, setMusical] = useState([0, 0, 0, 0, 0]);
  const [play, setPlay] = useState([0, 0, 0, 0, 0]);
  let loading = false;

  useEffect(() => {
    const getPerformanceBest = async () => {
      if (loading) return;
      loading = true;
      try {
        const response = await instance.get(
          "/performance/best?genre=CONCERT,MUSICAL,THEATER&size=5"
        );
        console.log("bests", response);
        const datas = await response.data;
        const integer = datas.parts;
        const res = datas.performanceResponses;

        setConcert(res.splice(0, integer[0]));
        setMusical(res.splice(0, integer[1]));
        setPlay(res.splice(0, integer[2]));
      } catch (error) {
        console.error(error, "에러");
      }
    };
    getPerformanceBest();
  }, []);

  const concertArr = [];
  const musicalArr = [];
  const playArr = [];
  concert.map((info, index) => {
    let like = false;
    if (favorites && favorites.includes(info.id + "")) {
      like = true;
    }
    concertArr.push(<ConcertCard info={info} key={index} like={like} />);
  });
  musical.map((info, index) => {
    let like = false;
    if (favorites && favorites.includes(info.id + "")) {
      like = true;
    }
    musicalArr.push(<ConcertCard info={info} key={index} like={like} />);
  });
  play.map((info, index) => {
    let like = false;
    if (favorites && favorites.includes(info.id + "")) {
      like = true;
    }
    playArr.push(<ConcertCard info={info} key={index} like={like} />);
  });

  return (
    <>
      <AdCarousel />
      <div className="container">
        <h2 className="concert-category">
          <Link to={"/performance?category=concert"}>콘서트</Link>
        </h2>
        <div className="main-carousel-container">
          <div className="responsible-carousel scroll-x">
            <div className="container">
              <div className="concert-list">{concertArr}</div>
            </div>
          </div>
        </div>
        <h2 className="concert-category">
          <Link to={"/performance?category=musical"}>뮤지컬</Link>
        </h2>
        <div className="main-carousel-container">
          <div className="responsible-carousel scroll-x">
            <div className="container">
              <div className="concert-list">{musicalArr}</div>
            </div>
          </div>
        </div>
        <h2 className="concert-category">
          <Link to={"performance?category=theater"}>연극</Link>
        </h2>
        <div className="main-carousel-container">
          <div className="responsible-carousel scroll-x">
            <div className="container">
              <div className="concert-list">{playArr}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
