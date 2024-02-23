import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../../assets/constants/instance";

const ConcertCard = (props) => {
  const url = useLocation();
  const [likethis, setLikethis] = useState(false);
  const setFavorites = props.setLike;
  const navigate = useNavigate();
  const info = props.info;
  const className =
    info.status === "END" ? "hot" : info.status === "" ? "hidden" : "";

  useEffect(() => {
    if (props.like) {
      setLikethis(true);
    } else setLikethis(false);
  });

  const likeChange = async (e) => {
    e.stopPropagation();
    if (!localStorage.getItem("withcon_token")) {
      window.alert("로그인이 필요한 서비스입니다. yes/no 모달 필요");
      return;
    }

    try {
      const savedFavorites = JSON.parse(localStorage.getItem("favorites"));
      let newFavorites = [];
      if (likethis) {
        await instance.delete(`/performance/${info.id}/unlike`);
        newFavorites = savedFavorites.filter((id) => id !== info.id);
      } else {
        await instance.post(`/performance/${info.id}/like`);
        newFavorites = [...savedFavorites, info.id];
      }
      if (setFavorites) {
        setFavorites(newFavorites);
      }
      setLikethis(!likethis);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } catch (error) {
      console.error(error, "에러");
    }
  };

  return (
    <div className="concert-card" onClick={() => navigate(`/title/${info.id}`)}>
      <div className="poster-box">
        <img className="concert-poster" src={info.poster} alt={info.name} />
      </div>
      <div className="concert-mini-info">
        <div className="info-top-line">
          <h3 className="concert-title">{info.name}</h3>
          <button className="like" onClick={likeChange}>
            <i className={likethis ? "bi bi-heart-fill" : "bi bi-heart"}></i>
          </button>
        </div>
        <div className="info-bottom-line">
          <p className="concert-place">{info.facility}</p>
          <p className="concert-date">{`${info.startDate}-${info.endDate}`}</p>
          <p className={`reservation-tip ${className}`}>{info.status}</p>
        </div>
      </div>
    </div>
  );
};

export default ConcertCard;
