import { useState } from "react";
import { Link } from "react-router-dom";

const AdCarousel = () => {
  const [activeNum, setActiveNum] = useState(0);

  const adList = [
    { title: "콘서트 광고", desc: "사랑해요 아이유", link: "ad-link-concert" },
    { title: "콘서트 광고", desc: "사랑해요 아이유", link: "ad-link-concert" },
    {
      title: "뮤지컬 광고",
      desc: "캣츠, 위키드, 아서왕의 전설",
      link: "ad-link-musical",
    },
    {
      title: "연극 광고",
      desc: "학교 연극동아리 공짜 연극 사랑함. 정규공연 감사함.",
      link: "ad-link-play",
    },
    {
      title: "연극 광고",
      desc: "학교 연극동아리 공짜 연극 사랑함. 정규공연 감사함. multi-elipsis테스트용 긴 문장multi-elipsis테스트용 긴 문장multi-elipsis테스트용 긴 문장multi-elipsis테스트용 긴 문장multi-elipsis테스트용 긴 문장multi-elipsis테스트용 긴 문장multi-elipsis테스트용 긴 문장multi-elipsis테스트용 긴 문장",
      link: "ad-link-play",
    },
  ];
  const maxLength = adList.length;
  const movePercent = Math.floor(100 / maxLength);
  const adCards = [];
  const bullets = [];

  adList.map((ad, index) => {
    const className = index === activeNum ? "active" : "";
    const card = (
      <div
        className={`slide ${className}`}
        key={index}
        style={{ width: `${movePercent}%` }}
      >
        <h3 className="ad-title">{ad.title}</h3>
        <p className="ad-desc">{ad.desc}</p>
        <div className="ad-link">
          <Link to={`/title/${ad.link}`}>
            <button className="ad-link-button">바로가기</button>
          </Link>
        </div>
      </div>
    );
    const bullet = <div key={`b${index}`} className={`bullet ${className}`} />;
    adCards.push(card);
    bullets.push(bullet);
  });

  const slide = (num) => {
    let newNum = activeNum + num;
    if (newNum >= maxLength) newNum = 0;
    if (newNum < 0) newNum = maxLength - 1;
    setActiveNum(newNum);
  };

  return (
    <div className="ad-carousel">
      <div
        className="ad-list"
        style={{
          width: `${maxLength * 100}%`,
          transform: `translateX(-${activeNum * movePercent}%)`,
        }}
      >
        {adCards}
      </div>
      <div className="ad-bullets">{bullets}</div>
      <button className="ad-button-left" onClick={() => slide(-1)}>
        &lt;
      </button>
      <button className="ad-button-right" onClick={() => slide(1)}>
        &gt;
      </button>
    </div>
  );
};

export default AdCarousel;
