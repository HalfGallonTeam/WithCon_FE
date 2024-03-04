import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import Paging from "../common/Paging";
import setLists from "../../assets/tools/setLists";

const MyChat = () => {
  const [datas, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
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

  return (
    <div className="chat-list-container">
      <section className="list-container">
        {Array.isArray(datas) ? (
          datas.map((data, index) => <ChatRoom searchData={data} key={index} />)
        ) : (
          <p className="room-msg-container">참여한 채팅방이 없습니다</p>
        )}
      </section>
      <Paging totalCount={totalCount} currentPage={currentPage} limit={5} />
    </div>
  );
};

export default MyChat;
