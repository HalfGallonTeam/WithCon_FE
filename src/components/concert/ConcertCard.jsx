import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import instance from "../../assets/constants/instance";
import { favorites } from "../../assets/constants/atoms";
import { useRecoilState } from "recoil";

const ConcertCard = (props) => {
  const [favoritePerformances, setFavoritePerformances] =
    useRecoilState(favorites);
  const [likethis, setLikethis] = useState(false);
  const navigate = useNavigate();
  const info = props.info;
  const className =
    info.status === "END" ? "hot" : info.status === "" ? "hidden" : "";

  useEffect(() => {
    if (favoritePerformances && favoritePerformances.includes(info.id)) {
      setLikethis(true);
    } else {
      setLikethis(false);
    }
  }, [favoritePerformances, info.id]);

  const likeChange = async (e) => {
    e.stopPropagation();
    if (!localStorage.getItem("withcon_token")) {
      window.alert("로그인이 필요한 서비스입니다. yes/no 모달 필요");
      return;
    }

    try {
      if (likethis) {
        const response = await instance.put(`/performance/${info.id}/unlike`);
        const newFavoritePerformances = [...favoritePerformances];
        const index = favoritePerformances.indexOf(info.id);
        if (index > -1) {
          newFavoritePerformances.splice(index, 1);
        }
        setFavoritePerformances(newFavoritePerformances);
      } else {
        const response = await instance.put(`/performance/${info.id}/like`);
        setFavoritePerformances([...favoritePerformances, info.id]);
      }
      setLikethis(!likethis);
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
