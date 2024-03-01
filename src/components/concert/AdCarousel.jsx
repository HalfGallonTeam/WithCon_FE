import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ad1 from "../../assets/images/ad1.png";
import ad2 from "../../assets/images/ad2.png";
import ad3 from "../../assets/images/ad3.png";

const AdCarousel = () => {
  const [activeNum, setActiveNum] = useState(0);

  const adList = [
    {
      link: "1",
      imgSrc: ad1,
      textColor: "#E6E6E6",
    },
    {
      link: "2",
      imgSrc: ad2,
      textColor: "#603535",
    },
    {
      link: "3",
      imgSrc: ad3,
      textColor: "#E6E6E6",
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
          color: ad.textColor,
        }}
      >
        <Link to={`/title/${ad.link}`}>
          <button className="ad-link-button" style={{ color: ad.textColor }}>
            바로가기
          </button>
        </Link>
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
