import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ConcertCard from "../concert/ConcertCard";
import Paging from "../common/Paging";
import { concertInfos as info } from "../../assets/datas/concertInfos";

const MyConcert = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(65); //나중에 data.length로 바꿔서 정리하기.
  const url = useLocation();
  useEffect(() => {
    setCurrentPage(new URLSearchParams(url.search).get("page") || 1);
  }, [url]);

  return (
    <>
      <div className="mypage-like-list">
        <div className="concert-list">
          <ConcertCard info={info[0]} />
          <ConcertCard info={info[1]} />
          <ConcertCard info={info[2]} />
          <ConcertCard info={info[3]} />
          <ConcertCard info={info[4]} />
          <ConcertCard info={info[5]} />
        </div>
      </div>
      <Paging totalCount={totalCount} currentPage={currentPage} />
    </>
  );
};

export default MyConcert;
