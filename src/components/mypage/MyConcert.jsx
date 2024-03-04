import { useState, useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import Paging from "../common/Paging";
import PAGE from "../../assets/constants/page";
import setLists from "../../assets/tools/setLists";
import Loading from "../common/Loading";

const ConcertCard = lazy(() => import("../concert/ConcertCard"));

const MyConcert = () => {
  const [infos, setInfos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
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
  }, [url]);

  return (
    <Suspense fallback={<Loading />}>
      <section className="concert-list">
        {Array.isArray(infos) ? (
          infos.map((info, index) => (
            <ConcertCard info={info} key={index} like={true} />
          ))
        ) : (
          <p className="room-msg-container">찜한 공연 목록이 없습니다</p>
        )}
      </section>
      <Paging totalCount={totalCount} currentPage={currentPage} limit={10} />
    </Suspense>
  );
};

export default MyConcert;
