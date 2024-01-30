import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ConcertCard from "./ConcertCard";
import Paging from "../common/Paging";
import { concertInfos } from "../../assets/datas/concertInfos";

const ConLists = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(65); //나중에 data.length로 바꿔서 정리하기.
  const { category } = useParams();
  const url = useLocation();
  useEffect(() => {
    setCurrentPage(new URLSearchParams(url.search).get("page") || 1);
  }, [url]);

  //concertInfo를 불러오는 단계에서 데이터 총량을 결정하고, 카드 그리기는 .map함수로 끝까지 진행할 것.
  let newConcertInfos = [];
  newConcertInfos = concertInfos;
  const concertCards = [];
  newConcertInfos.map((info, index) => {
    concertCards.push(<ConcertCard info={info} key={index} />);
  });

  return (
    <>
      <div className="category-buttons">
        <div className="container">
          <button className="category-button active">전체</button>
          <button className="category-button">콘서트</button>
          <button className="category-button">뮤지컬</button>
          <button className="category-button">연극</button>
        </div>
      </div>
      <div className="container">
        <div className="concert-list">{concertCards}</div>
        <Paging totalCount={totalCount} currentPage={currentPage} />
      </div>
    </>
  );
};

export default ConLists;
