import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ConcertCard from "./ConcertCard";
import Navigation from "../common/Navigation";
import Paging from "../common/Paging";
import PAGE from "../../assets/constants/page";
import setLists from "../../assets/tools/setLists";

const ConLists = () => {
  const [infos, setInfos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(65);
  const url = useLocation();
  const urlSearch = new URLSearchParams(url.search);
  let pages = urlSearch.get("page") || 1;
  let category = urlSearch
    .get("category")
    ?.replace(/[a-z]/g, (x) => x.toUpperCase());
  let keyword = urlSearch.get("keyword");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites"))
  );

  useEffect(() => {
    const getInfos = async () => {
      try {
        let url = `/performance?`;
        url += keyword ? `keyword=${keyword}&` : "";
        url += category ? `genre=${category}&` : "";
        url += `page=${pages - 1}&limit=${PAGE.limit}`;
        await setLists(url, setInfos, totalCount, setTotalCount);
      } catch (error) {
        console.error(error, "에러");
      }
    };
    getInfos();
    setCurrentPage(pages);
  }, [url]);

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

        <div className="concert-list">
          {infos.map((info, index) => (
            <ConcertCard
              info={info}
              key={index}
              like={favorites && favorites.includes(info.id + "")}
              setLike={setFavorites}
            />
          ))}
        </div>
        <Paging totalCount={totalCount} currentPage={currentPage} limit={10} />
      </div>
    </>
  );
};

export default ConLists;
