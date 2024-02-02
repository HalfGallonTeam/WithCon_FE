import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ConcertCard from "../concert/ConcertCard";
import Paging from "../common/Paging";
import instance from "../../assets/constants/instance";
import PAGE from "../../assets/constants/page";

const MyConcert = () => {
  const [infos, setInfos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(65); //나중에 data.length로 바꿔서 정리하기.
  const url = useLocation();
  const urlSearch = new URLSearchParams(url.search);
  let pages = urlSearch.get("page") || 1;

  useEffect(() => {
    const getTotalCount = async () => {
      let request = `/performances?`;
      request += `&title_like=bts`;
      const response = await instance.get(request);
      const datas = await response.data;
      setTotalCount(datas.length);
    };
    getTotalCount();
  }, []);

  useEffect(() => {
    const getInfos = async () => {
      let request = `/performances?_page=${pages}&_limit=${PAGE.limit}`;
      request += `&title_like=bts`;
      const response = await instance.get(request);
      const datas = await response.data;
      setInfos(datas);
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
      <p className="desc">
        user favorite으로 필터링한 결과물이 없어 제목이 bts인 콘서트 목록으로
        임시 설정했습니다.
      </p>
      <div className="mypage-like-list">
        <div className="concert-list">{concertCards}</div>
      </div>
      <Paging totalCount={totalCount} currentPage={currentPage} />
    </div>
  );
};

export default MyConcert;
