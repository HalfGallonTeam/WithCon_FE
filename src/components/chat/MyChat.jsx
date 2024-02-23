import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import Paging from "../common/Paging";
import setLists from "../../assets/tools/setLists";
import PAGE from "../../assets/constants/page";

const MyChat = () => {
  const [datas, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(65); //나중에 data.length로 바꿔서 정리하기.
  const url = useLocation();
  const urlSearch = new URLSearchParams(url.search);
  let pages = urlSearch.get("page") || 1;

  useEffect(() => {
    const getData = async () => {
      try {
        let url = "/chatRoom/member";
        url += `?page=${pages - 1}&limit=${PAGE.limit}`;
        await setLists(url, setData, totalCount, setTotalCount);
      } catch (error) {
        console.error("데이터오류", error);
      }
    };
    getData();
    setCurrentPage(pages);
  }, [url]);

  const chatRooms = [];
  datas.map((data) => {
    chatRooms.push(<ChatRoom searchData={data} key={data.id} />);
  });

  return (
    <div className="mychat-container">
      <p className="desc">
        user favorite으로 필터링한 결과물이 없어 임시로 3개만 끊어 그립니다.
      </p>
      <div className="list-container">{chatRooms}</div>
      <Paging totalCount={totalCount} currentPage={currentPage} />
    </div>
  );
};

export default MyChat;
