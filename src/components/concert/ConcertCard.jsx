import { useNavigate } from "react-router-dom";
import { useState } from "react";
import instance from "../../assets/constants/instance";

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

  const likeChange = async (e) => {
    e.stopPropagation();
    //비로그인 유저의 사용 막기
    if (!localStorage.getItem("withcon_token")) {
      window.alert("로그인이 필요한 서비스입니다. 로그인하시겠습니까?");
      //모달 필요
    }

    try {
      //하트 상태에 따른 다른 post. 백엔드에서 like/unlike설정할지 상의할 것.

      if (likethis) {
        // const response = await instance.post(
        //   `/performance/favorite/${info.id}`,
        //   PageableDefault(size, sort, direction)
        // );
        const response = await instance.get(`/performanceFavorite`);
        const favorites = await response.data;
        const newFavorites = [];
        favorites.forEach((favorite) => {
          if (favorite.id !== info.id) {
            newFavorites.push(favorite);
          }
        });
        const response2 = await instance.patch(`/performanceFavorite`, {
          favorites: newFavorites,
        });
        console.log(response2.data);
        //받은 데이터를 세팅해 useRecoil로 찜 설정에 활용할 것.
      } else {
        // const response = await instance.delete(
        //   `/performance/favorite/${info.id}`,
        //   PageableDefault(size, sort, direction)
        // );
        const response = await instance.get(`/performanceFavorite`);
        const favorites = await response.data;
        const newFavorites = [...favorites, info];
        const response2 = await instance.patch(`/performanceFavorite`, {
          favorites: newFavorites,
        });
        console.log(response2.data);
        //받은 데이터를 세팅해 useRecoil로 찜 설정에 활용할 것.
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
