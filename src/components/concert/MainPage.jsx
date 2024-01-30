import { Link } from "react-router-dom";
import AdCarousel from "./AdCarousel";
import ConcertCard from "./ConcertCard";
import { concertInfos } from "../../assets/datas/concertInfos";

const ConLists = () => {
  //나중엔 axios로 데이터를 불러올 것.
  const newConcertInfos = []
  for(let i=0; i<5; i++) {
    newConcertInfos.push(concertInfos[i])
  }
  //(끝)나중엔 axios

  const concertCards = []
  newConcertInfos.map((info, index) => {
    concertCards.push(<ConcertCard info={info} key={index}/>)
  })

  return (
    <>
      <div className="container">
        <div className="concert-list">
          {concertCards}
        </div>
      </div>
    </>
  )
}

const MainPage = () => {
  return (
    <>
      <AdCarousel />
      <div className="container">
        <h2 className="concert-category">
          <Link to="/performance/concert">콘서트</Link>
        </h2>
        <div className="main-carousel-container">
          <div className="responsible-carousel scroll-x">
            <ConLists/>
          </div>
        </div>
        <h2 className="concert-category">
          <Link to="/performance/musical">뮤지컬</Link>
        </h2>
        <div className="main-carousel-container">
          <div className="responsible-carousel scroll-x">
            <ConLists/>
          </div>
        </div>
        <h2 className="concert-category">
          <Link to="/performance/play">연극</Link>
        </h2>
        <div className="main-carousel-container">
          <div className="responsible-carousel scroll-x">
            <ConLists/>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
