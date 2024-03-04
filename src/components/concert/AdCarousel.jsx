import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdCarousel = () => {
  const [activeNum, setActiveNum] = useState(0);

  const adList = [
    {
      link: "1",
      imgSrc:
        "https://www.kopis.or.kr/upload/pfmPoster/PF_PF233882_240115_105255.gif",
      textColor: "white",
      position: "left 50% bottom 0",
      title: "구원찬 콘서트 광고",
    },
    {
      link: "10",
      imgSrc:
        "https://www.kopis.or.kr/upload/pfmPoster/PF_PF234853_240202_100411.gif",
      textColor: "white",
      position: "50% 25%",
      title: "안녕 달아 공연 광고",
    },
    {
      link: "3",
      imgSrc:
        "https://www.kopis.or.kr/upload/pfmPoster/PF_PF234570_240129_095812.png",
      textColor: "white",
      position: "50% 15%",
      title: "거꾸로 청개구리 공연 광고",
    },
  ];
  const maxLength = adList.length;
  const movePercent = Math.floor(100 / maxLength);
  const adCards = [];
  const bullets = [];

  adList.map((ad, index) => {
    const className = index === activeNum ? "active" : "";
    const card = (
      <article
        className={`slide ${className}`}
        key={index}
        style={{
          width: `${movePercent}%`,
          backgroundImage: `url(${ad.imgSrc})`,
          color: ad.textColor,
          "background-position": ad.position,
        }}
        aria-label={ad.title}
      >
        <Link to={`/title/${ad.link}`}>
          <button className="ad-link-button" style={{ color: ad.textColor }}>
            바로가기
          </button>
        </Link>
      </article>
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
    <section className="ad-carousel">
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
    </section>
  );
};

export default AdCarousel;
