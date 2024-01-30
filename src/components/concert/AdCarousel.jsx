import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import imgBlack from "../../assets/images/ad-background.jpg";
import imgLight from "../../assets/images/ad-background-light.jpg";

const AdCarousel = () => {
  const [activeNum, setActiveNum] = useState(0);

  const adList = [
    {
      title: "콘서트 광고",
      desc: "사랑해요 아이유",
      link: "ad-link-concert",
      imgSrc: imgBlack,
    },
    {
      title: "콘서트 광고",
      desc: "사랑해요 아이유",
      link: "ad-link-concert",
      imgSrc: imgLight,
    },
    {
      title: "뮤지컬 광고",
      desc: "캣츠, 위키드, 아서왕의 전설",
      link: "ad-link-musical",
      imgSrc: imgBlack,
    },
    {
      title: "연극 광고",
      desc: "학교 연극동아리 공짜 연극 사랑함. 정규공연 감사함.",
      link: "ad-link-play",
      imgSrc: imgLight,
    },
    {
      title: "연극 광고",
      desc: "학교 연극동아리 공짜 연극 사랑함. 정규공연 감사함. multi-elipsis테스트용 긴 문장multi-elipsis테스트용 긴 문장multi-elipsis테스트용 긴 문장multi-elipsis테스트용 긴 문장multi-elipsis테스트용 긴 문장multi-elipsis테스트용 긴 문장multi-elipsis테스트용 긴 문장multi-elipsis테스트용 긴 문장",
      link: "ad-link-play",
      imgSrc: imgBlack,
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
        style={{
          width: `${movePercent}%`,
          backgroundImage: `url(${ad.imgSrc})`,
        }}
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

  const slide = (num = 1) => {
    let newNum = activeNum + num;
    if (newNum >= maxLength) newNum = 0;
    if (newNum < 0) newNum = maxLength - 1;
    setActiveNum(newNum);
  };

  useEffect(() => {
    const id = setInterval(slide, 5000);
    return () => {
      clearTimeout(id);
    };
  }, [activeNum]);

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
        <i className="bi bi-caret-left-fill"></i>
      </button>
      <button className="ad-button-right" onClick={() => slide(1)}>
        <i className="bi bi-caret-right-fill"></i>
      </button>
    </div>
  );
};

export default AdCarousel;
