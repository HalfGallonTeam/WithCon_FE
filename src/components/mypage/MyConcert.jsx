import { Link } from "react-router-dom";

const ConcertCard = () => {
  return (
    <Link to="/thisConcert/">
      <div className="concert-card">
        <img
          className="concert-poster"
          src="https://dummyimage.com/160x240/E6E6E6/0011ff"
          alt="빈 이미지"
        />
        <div className="concert-mini-info">
          <div className="info-top-line">
            <p className="concert-title">공연이름</p>
            <i className="bi bi-heart"></i>
            <i className="bi bi-heart-fill"></i>
            <button className="like">7</button>
          </div>
          <div className="info-bottom-line">
            <p className="concert-place">공연위치</p>
            <p className="concert-date">2024-01-01</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

const MyConcert = () => {
  return (
    <div>
      <div className="concert-list">
        <ConcertCard />
        <ConcertCard />
        <ConcertCard />
        <ConcertCard />
        <ConcertCard />
        <ConcertCard />
      </div>
    </div>
  );
};

export default MyConcert;
