import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ConcertCard from "./ConcertCard";
import Navigation from "../common/Navigation";
import Paging from "../common/Paging";
import PAGE from "../../assets/constants/page";
import instance from "../../assets/constants/instance";
import setLists from "../../assets/tools/setLists";
import { favorites, userIn } from "../../assets/constants/atoms";
import { useRecoilState, useRecoilValue } from "recoil";

const ConLists = () => {
  const [infos, setInfos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(65);
  const url = useLocation();
  const urlSearch = new URLSearchParams(url.search);
  let pages = urlSearch.get("page") || 1;
  let category = urlSearch.get("category");
  let keyword = urlSearch.get("keyword");
  const [favoritePerformances, setFavoritePerformances] =
    useRecoilState(favorites);
  const isLogin = useRecoilValue(userIn);

  useEffect(() => {
    const getFavoritPerformances = async () => {
      const response = await instance.get("/performanceFavorite");
      const datas = await response.data;
      const performanceIds = [];
      datas.map((data) => {
        performanceIds.push(data.id);
      });
      setFavoritePerformances(performanceIds);
    };
    if (isLogin && !favoritePerformances) {
      getFavoritPerformances();
    }
  }, [isLogin, favoritePerformances]);

  useEffect(() => {
    const getInfos = async () => {
      try {
        let url = `/performance?`;
        url += keyword ? `keyword=${keyword}&` : "";
        url += category ? `genre=${category}&` : "";
        url += `_page=${pages}&_limit=${PAGE.limit}`;
        await setLists(url, setInfos, totalCount, setTotalCount);
      } catch (error) {
        console.error(error, "에러");
      }
    };
    getInfos();
    setCurrentPage(pages);
  }, [url]);

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
    <>
      <div className="container">
        {keyword && (
          <>
            <p className="search-desc">
              <span className="search-keyword">&quot;{keyword}&quot;</span>
              &nbsp;검색 결과
            </p>
            <Navigation search={true} />
          </>
        )}

        <div className="concert-list">{concertCards}</div>
        <Paging totalCount={totalCount} currentPage={currentPage} />
      </div>
    </>
  );
};

export default ConLists;
