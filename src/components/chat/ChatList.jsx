import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import CreateChatRoom from "./CreateChatRoom";
import Paging from "../common/Paging";
import instance from "../../assets/constants/instance";
import setLists from "../../assets/tools/setLists";
import ButtonModal from "../common/modal";

const ChatList = () => {
  const [tagInfo, setTagInfo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [searchHashtag, setSearchHashtag] = useState("");
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState(null);
  const url = useLocation();
  const urlSearch = new URLSearchParams(url.search);
  const pages = urlSearch.get("page") || 1;
  const { concertTitle } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const openModal = () => {
    if (!localStorage.getItem("withcon_token")) {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/login");
      }, 1000);
    } else {
      setIsModalOpen(true);
    }
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
        await setLists(url, setData, totalCount, setTotalCount, setSearchData);
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
    <section className="chat-list-container">
      <header className="chat-list-header">
        <h3>채팅방 목록</h3>
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
                만들기
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
      </header>
      <section className="list-container">
        {showModal ? (
          <ButtonModal
            buttonContainer="0"
            text="로그인한 사용자만 가능합니다"
          />
        ) : null}
        {Array.isArray(data) ? (
          data.map((searchData) => (
            <ChatRoom searchData={searchData} key={searchData.id} />
          ))
        ) : (
          <p className="room-msg-container">채팅방이 없습니다.</p>
        )}
      </section>
      <Paging totalCount={totalCount} currentPage={currentPage} limit={5} />
    </section>
  );
};

export default ChatList;
