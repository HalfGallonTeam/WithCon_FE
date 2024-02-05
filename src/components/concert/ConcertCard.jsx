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
    info.reservation === "단독판매"
      ? "hot"
      : info.reservation === ""
      ? "hidden"
      : "";

  useEffect(() => {
    if (favoritePerformances && favoritePerformances.includes(info.id)) {
      setLikethis(true);
    } else {
      setLikethis(false);
    }
  }, [favoritePerformances, info.id]);

  const likeChange = async (e) => {
    e.stopPropagation();
    //비로그인 유저의 사용 막기
    if (!localStorage.getItem("withcon_token")) {
      window.alert("로그인이 필요한 서비스입니다. 로그인하시겠습니까?");
      //모달 필요
      return;
    }

    try {
      //하트 상태에 따른 다른 post. 백엔드에서 like/unlike설정할지 상의할 것.
      if (likethis) {
        // const response = await instance.post(
        //   `/performance/favorite/${info.id}`,
        //   PageableDefault(size, sort, direction)
        // );
        const response = await instance.delete(
          `/performanceFavorite/${info.id}`
        );
        console.log(response.data);
        const newFavoritePerformances = [...favoritePerformances];
        const index = favoritePerformances.indexOf(info.id);
        if (index > -1) {
          newFavoritePerformances.splice(index, 1);
        }
        setFavoritePerformances(newFavoritePerformances);
      } else {
        // const response = await instance.delete(
        //   `/performance/favorite/${info.id}`,
        //   PageableDefault(size, sort, direction)
        // );
        const response = await instance.post(`/performanceFavorite`, info);
        console.log(response.data);
        setFavoritePerformances([...favoritePerformances, info.id]);
      }
      setLikethis(!likethis);
    } catch (error) {
      console.error(error, "에러");
    }
  };

  return (
    <div
      className="concert-card"
      onClick={() => navigate(`/title/${"공연아이디" + info.id}`)}
    >
      <div className="poster-box">
        <img className="concert-poster" src={info.poster} alt={info.title} />
      </div>
      <div className="concert-mini-info">
        <div className="info-top-line">
          <h3 className="concert-title">{info.title}</h3>
          <button className="like" onClick={likeChange}>
            <i className={likethis ? "bi bi-heart-fill" : "bi bi-heart"}></i>
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
