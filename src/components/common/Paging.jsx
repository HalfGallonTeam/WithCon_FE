import { useNavigate } from "react-router-dom";

/**
 * limit = 한 번에 불러오는 데이터량(한 페이지당 그려지는 카드 수)
 * pageCount = 한 번에 보여지는 페이지 수
 * 총 페이지 수 = Math.ceil(totalCount/limit)
 * 시작버튼은 몇 번이죠? Math.floor(currentPage/pageCount) + 1
 * 이전 버튼 있나요? 시작버튼 > pageCount
 * 이전 버튼을 누르면 어디로 가나요? 시작버튼 - 1
 * 다음 버튼 있나요? 총 페이지 수 > Math.ceil(currentPage/pageCount) * pageCount
 * 다음 버튼을 누르면 어디로 가나요? Math.ceil(currentPage/pageCount) * pageCount + 1
 */

const PAGE = {
  pageCount: 5,
  limit: 5,
};

const Paging = (props) => {
  const navigate = useNavigate();
  let filterSearch = new URL(window.location.href).search;
  const currentPageChange = (event) => {
    if (!event.target.value) return;
    console.log(filterSearch);
    navigate("?page=" + event.target.value);
  };

  // console.log(filterSearch);
  // console.log(filterSearch.search) //search ? 이후의 모든 것. page포함
  // console.log(filterSearch.pathname) ///search/, /performance/concert

  const buttons = [];
  const totalCount = props.totalCount;
  const pageCount = PAGE.pageCount;
  const currentPage = props.currentPage;
  const limit = PAGE.limit;
  const totalPage = Math.ceil(totalCount / limit);
  const startPage = (Math.ceil(currentPage / pageCount) - 1) * pageCount + 1;
  const endPage = Math.ceil(currentPage / pageCount) * pageCount;
  for (let i = startPage; i < startPage + pageCount; i++) {
    if (i > totalPage) break;
    const now = i === Number(currentPage) ? "active" : "";
    const button = (
      <button className={now} value={i} key={i}>
        {i}
      </button>
    );
    buttons.push(button);
  }

  return (
    <div className="paging-box" onClick={currentPageChange}>
      <button
        value={startPage - 1}
        key="prev"
        className={startPage > pageCount ? "prev" : "prev invisible"}
        title="이전 페이지"
      >
        &lt;
      </button>
      <div className="page-numbers">{buttons}</div>
      <button
        value={endPage + 1}
        key="next"
        className={totalPage > endPage ? "next" : "next invisible"}
        title="다음 페이지"
      >
        &gt;
      </button>
    </div>
  );
};

export default Paging;
