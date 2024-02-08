import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ConcertCard = (props) => {
  const [likethis, setLikethis] = useState(false);
  const navigate = useNavigate();
  const info = props.info;
  const className =
    info.reservation === "단독판매"
      ? "hot"
      : info.reservation === ""
      ? "hidden"
      : "";
  const likeChange = (e) => {
    e.stopPropagation();
    setLikethis(!likethis);
  };

  return (
    <div className="concert-card" onClick={() => navigate(`/title/${info.id}`)}>
      <div className="poster-box">
        <img className="concert-poster" src={info.poster} alt={info.title} />
      </div>
      <div className="concert-mini-info">
        <div className="info-top-line">
          <h3 className="concert-title">{info.title}</h3>
          <button className="like" onClick={likeChange}>
            {likethis && <i className="bi bi-heart-fill"></i>}
            {!likethis && <i className="bi bi-heart"></i>}
          </button>
        </div>
        <div className="info-bottom-line">
          <p className="concert-place">{info.place}</p>
          <p className="concert-date">{info.date}</p>
          <p className={`reservation-tip ${className}`}>{info.reservation}</p>
        </div>
      </div>
    </div>
  );
};

export default ConcertCard;
