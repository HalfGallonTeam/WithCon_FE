import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ConcertCard from "../concert/ConcertCard";
import Paging from "../common/Paging";
import instance from "../../assets/constants/instance";
import PAGE from "../../assets/constants/page";

const MyConcert = () => {
  const [infos, setInfos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(65);
  const url = useLocation();
  const urlSearch = new URLSearchParams(url.search);
  let pages = urlSearch.get("page") || 1;

  useEffect(() => {
    const getInfos = async () => {
      try {
        /**찜한 공연 리스트 조회
        let memberId = await instance.get("/member").data["username"];
        let urlFavorite = `/member/${memberId}/performance`;
        urlFavorite += `?_page=${page}&_limit=${PAGE.limit}`;
        let favorite = await instance.get(urlFavorite).data;
        //response형식이 List<performanceDto>이므로 완벽한 공연정보 리스트일 것.
        //(끝)찜한 공연 리스트 조회*/

        const request = `/performance/favorite?_page=${pages}&_limit=${PAGE.limit}`;
        const response = await instance.get(request);
        const datas = await response.data;
        setInfos(datas);
        const length = response.headers["x-total-count"];
        if (length !== totalCount) {
          setTotalCount(length);
        }
      } catch (error) {
        console.error(error, "에러");
      }
    };
    getInfos();
    setCurrentPage(pages);
  }, [pages]);

  const concertCards = [];
  infos.map((info, index) => {
    concertCards.push(<ConcertCard info={info} key={index} />);
  });
  if (!infos.length) {
    concertCards.push(
      <div key="1">
        <h2 className="notice">결과가 없습니다</h2>
      </div>
    );
  }

  return (
    <div className="like-list-container">
      <div className="mypage-like-list">
        <div className="concert-list">{concertCards}</div>
      </div>
      <Paging totalCount={totalCount} currentPage={currentPage} />
    </div>
  );
};

export default MyConcert;
