import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import Paging from "../common/Paging";
import setLists from "../../assets/tools/setLists";

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
        url += `?page=${pages - 1}`; //limit=5
        await setLists(url, setData, totalCount, setTotalCount);
      } catch (error) {
        console.error("데이터오류", error);
      }
    };
    getData();
    setCurrentPage(pages);
  }, [url]);

  const chatRooms = [];
  datas.map((data, index) => {
    chatRooms.push(<ChatRoom searchData={data} key={index} />);
  });

  return (
    <div className="mychat-container">
      <div className="list-container">{chatRooms}</div>
      <Paging totalCount={totalCount} currentPage={currentPage} limit={5} />
    </div>
  );
};

export default MyChat;
