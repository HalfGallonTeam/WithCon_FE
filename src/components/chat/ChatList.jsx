import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import CreateChatRoom from "./CreateChatRoom";
import Paging from "../common/Paging";
import instance from "../../assets/constants/instance";
import setLists from "../../assets/tools/setLists";

const ChatList = () => {
  const [tagInfo, setTagInfo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(65);
  const [searchHashtag, setSearchHashtag] = useState("");
  const [data, setData] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const url = useLocation();
  const urlSearch = new URLSearchParams(url.search);
  const pages = urlSearch.get("page") || 1;
  const { concertTitle } = useParams();

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleHashTagChange = async (e) => {
    setData(searchData);
    setTagInfo([]);
    setSearchHashtag(e.target.value);
    try {
      const response = await instance.get(
        `/tag/${e.target.value}/search/performance/${concertTitle}`
      );
      if (response.data.length !== 0) {
        setTagInfo(response.data);
      } else {
        const response2 = await instance.get("/tag/search");
        console.log("여길", response2);
        setTagInfo(response2.data);
      }
    } catch (error) {
      if (error.response.status === 404) {
        const response2 = await instance.get("/tag/search");
        setTagInfo(response2.data);
      }
      console.error(error, "에러");
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let url = "/chatRoom/performance/";
        url += concertTitle;
        url += `?page=${pages - 1}`; //limit=5
        await setLists(url, setSearchData, setData, totalCount, setTotalCount);
      } catch (error) {
        console.error("데이터오류", error);
      }
    };
    getData();

    setCurrentPage(pages);
  }, [url]);

  const handleSearch = async (e) => {
    try {
      const url = `/tag/${searchHashtag}/search/performance/${concertTitle}`;
      const response = await instance.get(url);
      if (response.data.length !== 0) {
        const tagData = response.data[0].name;
        const newData = data.filter((x) => x.tags.includes(tagData));
        setData(newData);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error(error, "에러");
    }
  };

  const handleSearchKeydown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const tagClick = (tagName) => {
    const tagNameClick = data.filter((x) => x.tags.includes(tagName));
    setData(tagNameClick);
    setTagInfo([]);
    setSearchHashtag("");
  };
  return (
    <div className="chat-list-container">
      <div className="chat-list-header">
        <h1>채팅방 목록</h1>
        <div className="header-right">
          <div className="hashtag-search">
            <div className="hashtag-search-inner">
              <input
                id="hashtag"
                placeholder="해시태그를 입력해 주세요."
                value={searchHashtag}
                onChange={handleHashTagChange}
                onKeyDown={handleSearchKeydown}
                autoComplete="off"
              />
              <button onClick={handleSearch}>검색</button>
            </div>
            {tagInfo.length !== 0 ? (
              <ul className="search-tag-lists">
                {tagInfo?.map((info) => (
                  <li key={info.name} onClick={() => tagClick(info.name)}>
                    {info.name}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="chat-btn-container">
            <div className="create-chat">
              <button className="create-chat-btn" onClick={openModal}>
                채팅방 만들기
              </button>
            </div>
            {isModalOpen && (
              <CreateChatRoom
                onClose={closeModal}
                performanceId={concertTitle}
              />
            )}
          </div>
        </div>
      </div>
      <div className="list-container">
        {data && data.length > 0 ? (
          data.map((searchData) => (
            <ChatRoom searchData={searchData} key={searchData.id} />
          ))
        ) : (
          <div className="room-msg-container">
            <span>채팅방이 없습니다.</span>
          </div>
        )}
      </div>
      <Paging totalCount={totalCount} currentPage={currentPage} limit={5} />
    </div>
  );
};

export default ChatList;
