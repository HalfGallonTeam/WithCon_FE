import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import CreateChatRoom from "./CreateChatRoom";
import Paging from "../common/Paging";
import instance from "../../assets/constants/instance";

const ChatList = () => {
  const [tagInfo, setTagInfo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(65);
  const [searchHashtag, setSearchHashtag] = useState("");
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
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
    setSearchHashtag(e.target.value);
    try {
      const response = await instance.get(
        `/tag/${e.target.value}/search/performance/${concertTitle}`
      );
      if (response.data.length) {
        setTagInfo(response.data);
      } else {
        const response2 = await instance.get("/tag/search");
        setTagInfo(response2.data);
      }
    } catch (error) {
      console.error(error, "에러");
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let url = "/chatRoom/performance/";
        url += concertTitle;
        url += `?_page=${pages}&_limit=10`;
        const response = await instance.get(url);
        setData(response.data);
        const length = response.headers["x-total-count"];
        if (length !== totalCount) {
          setTotalCount(length);
        }
      } catch (error) {
        console.error("데이터오류", error);
      }
    };
    getData();
    setCurrentPage(pages);
  }, [url]);

  const upDateFilterData = () => {
    const filterData = data
      ? searchHashtag
        ? data.filter((data) => data.tags.includes(searchHashtag))
        : data
      : null;
    setFilteredData(filterData);
  };
  const handleSearch = () => {
    upDateFilterData();
  };
  const handleSearchKeydown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const searchedTags = [];
  tagInfo.map((tag) => {
    searchedTags.push(<span>&nbsp;{tag.name}&nbsp;</span>);
  });

  return (
    <div className="chat-list-container">
      <div>
        <p>태그 검색결과 임시로 보여줌</p>
        <p>{searchedTags}</p>
      </div>
      <div className="chat-list-header">
        <h1>채팅방 목록</h1>
        <div className="header-right">
          <div className="hashtag-search">
            <input
              id="hashtag"
              placeholder="해시태그를 입력해 주세요."
              value={searchHashtag}
              onChange={handleHashTagChange}
              onKeyDown={handleSearchKeydown}
            />
            <button onClick={handleSearch}>검색</button>
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
        {data && (filteredData || data).length > 0 ? (
          (filteredData || data).map((searchData) => (
            <ChatRoom searchData={searchData} key={searchData.id} />
          ))
        ) : (
          <div className="room-msg-container">
            <span>채팅방이 없습니다.</span>
          </div>
        )}
      </div>
      <Paging totalCount={totalCount} currentPage={currentPage} />
    </div>
  );
};

export default ChatList;
