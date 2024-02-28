import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ConcertCard from "../concert/ConcertCard";
import Paging from "../common/Paging";
import instance from "../../assets/constants/instance";
import PAGE from "../../assets/constants/page";
import setLists from "../../assets/tools/setLists";

const MyConcert = () => {
  const [infos, setInfos] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(65);
  const url = useLocation();
  const urlSearch = new URLSearchParams(url.search);
  let pages = urlSearch.get("page") || 1;

  useEffect(() => {
    const getInfos = async () => {
      try {
        const url = `/performance/favorite?page=${pages - 1}&limit=${
          PAGE.limit
        }`;
        await setLists(url, setInfos, totalCount, setTotalCount);
      } catch (error) {
        console.error(error, "에러");
      }
    };
    getInfos();
    setCurrentPage(pages);
  }, [pages]);

  const concertCards = [];
  infos.map((info, index) => {
    concertCards.push(<ConcertCard info={info} key={index} like={true} />);
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
      <Paging totalCount={totalCount} currentPage={currentPage} limit={10} />
    </div>
  );
};

export default MyConcert;
