import { useLocation, useParams } from "react-router-dom";
import ConcertCard from "./ConcertCard";
import Paging from "../common/Paging";
import { useEffect, useState } from "react";

const concertInfos = [
  {
    poster: "https://dummyimage.com/180x240/E6E6E6/0011ff",
    title: "뮤지컬 몬테크리스토",
    place: "충무아트센터 대극장",
    date: "2023.11.21-2024.2.25",
    reservation: "좌석우위",
  },
  {
    poster: "https://dummyimage.com/180x240/E6E6E6/0011ff",
    title: "뮤지컬 레미제라블",
    place: "블루스퀘어 신한카드홀",
    date: "2023.11.21-2024.3.10",
    reservation: "단독판매",
  },
  {
    poster: "https://dummyimage.com/180x240/E6E6E6/0011ff",
    title: "태양의서커스 루치아 - 부산",
    place: "신세계 센텀시티 내 빅탑",
    date: "2024.4.14-2.4",
    reservation: "",
  },
  {
    poster: "https://dummyimage.com/180x240/E6E6E6/0011ff",
    title: "뮤지컬 몬테크리스토",
    place: "충무아트센터 대극장",
    date: "2023.11.21-2024.2.25",
    reservation: "좌석우위",
  },
  {
    poster: "https://dummyimage.com/180x240/E6E6E6/0011ff",
    title: "뮤지컬 레미제라블",
    place: "블루스퀘어 신한카드홀",
    date: "2023.11.21-2024.3.10",
    reservation: "단독판매",
  },
  {
    poster: "https://dummyimage.com/180x240/E6E6E6/0011ff",
    title: "뮤지컬 몬테크리스토",
    place: "충무아트센터 대극장",
    date: "2023.11.21-2024.2.25",
    reservation: "좌석우위",
  },
  {
    poster: "https://dummyimage.com/180x240/E6E6E6/0011ff",
    title: "뮤지컬 레미제라블",
    place: "블루스퀘어 신한카드홀",
    date: "2023.11.21-2024.3.10",
    reservation: "단독판매",
  },
  {
    poster: "https://dummyimage.com/180x240/E6E6E6/0011ff",
    title: "태양의서커스 루치아 - 부산",
    place: "신세계 센텀시티 내 빅탑",
    date: "2024.4.14-2.4",
    reservation: "",
  },
  {
    poster: "https://dummyimage.com/180x240/E6E6E6/0011ff",
    title: "뮤지컬 몬테크리스토",
    place: "충무아트센터 대극장",
    date: "2023.11.21-2024.2.25",
    reservation: "좌석우위",
  },
  {
    poster: "https://dummyimage.com/180x240/E6E6E6/0011ff",
    title: "뮤지컬 레미제라블",
    place: "블루스퀘어 신한카드홀",
    date: "2023.11.21-2024.3.10",
    reservation: "단독판매",
  },
  {
    poster: "https://dummyimage.com/180x240/E6E6E6/0011ff",
    title: "뮤지컬 몬테크리스토",
    place: "충무아트센터 대극장",
    date: "2023.11.21-2024.2.25",
    reservation: "좌석우위",
  },
  {
    poster: "https://dummyimage.com/180x240/E6E6E6/0011ff",
    title: "뮤지컬 레미제라블",
    place: "블루스퀘어 신한카드홀",
    date: "2023.11.21-2024.3.10",
    reservation: "단독판매",
  },
  {
    poster: "https://dummyimage.com/180x240/E6E6E6/0011ff",
    title: "태양의서커스 루치아 - 부산",
    place: "신세계 센텀시티 내 빅탑",
    date: "2024.4.14-2.4",
    reservation: "",
  },
  {
    poster: "https://dummyimage.com/180x240/E6E6E6/0011ff",
    title: "뮤지컬 몬테크리스토",
    place: "충무아트센터 대극장",
    date: "2023.11.21-2024.2.25",
    reservation: "좌석우위",
  },
  {
    poster: "https://dummyimage.com/180x240/E6E6E6/0011ff",
    title: "뮤지컬 레미제라블",
    place: "블루스퀘어 신한카드홀",
    date: "2023.11.21-2024.3.10",
    reservation: "단독판매",
  },
];

const ConLists = (props) => {
  const getKeyword = useLocation().search;
  let forCurrentPage = new URLSearchParams(getKeyword).get("page") || 1;
  let { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(65); //나중에 data.length로 바꿔서 정리하기.
  const categoryToText = {
    concert: "콘서트",
    musical: "뮤지컬",
    play: "연극",
  };

  useEffect(() => {
    setCurrentPage(forCurrentPage);
  }, [forCurrentPage]);

  const length = props.length;
  //concertInfos는 length가 있으면 main page용으로 5개 끊고, 아닌 경우 page length로 끝장보기.
  let newConcertInfos = [];
  if (length) {
    for (let i = 0; i < length; i++) {
      newConcertInfos.push(concertInfos[i]);
    }
  } else {
    newConcertInfos = concertInfos;
  }
  //concertInfo를 불러오는 단계에서 데이터 총량을 결정하고, 카드 그리기는 .map함수로 끝까지 진행할 것.

  const concertCards = [];
  newConcertInfos.map((info, index) => {
    concertCards.push(<ConcertCard info={info} key={index} />);
  });

  return (
    <>
      <div className="container">
        {category && (
          <h2 className="concert-category">{categoryToText[category]}</h2>
        )}
        <div className="concert-list">{concertCards}</div>
        {!length && (
          <Paging totalCount={totalCount} currentPage={currentPage} />
        )}
      </div>
    </>
  );
};

export { concertInfos, ConLists as default };
