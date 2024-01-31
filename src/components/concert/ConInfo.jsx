import axios from "axios";
import { useEffect, useState } from "react";

const ConInfo = () => {
  const [infoData, setInfoData] = useState([null]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/test/conInfo.json");
        setInfoData(response.data);
      } catch (error) {
        console.error(error, "에러");
      }
    };
    fetchData();
  }, []);
  const infoItems = [];
  for (let key in infoData[0]) {
    infoItems.push(
      <li className="info-item" key={key}>
        <span className="item-name">{key} </span>
        <div>
          <span>
            {typeof infoData[0][key] === "number" && key === "가격"
              ? `${infoData[0][key].toLocaleString()} 원`
              : infoData[0][key]}
          </span>
        </div>
      </li>
    );
  }
  return (
    <div className="info-container">
      <div className="info">
        <div className="info-img">
          <img
            src="https://dummyimage.com/300x400/E6E6E6/0011ff"
            alt="빈 이미지"
          />
          <span> ❤️ 117</span>
        </div>
        <div className="description">
          <ul className="info-items">{infoItems}</ul>
        </div>
      </div>
      <div className="map">
        <div className="contact">
          <span>위치:OO시 OO길 12-3</span>
          <span>Tel : 12 - 345 - 6789</span>
        </div>
        <div className="map-img">
          <img
            src="https://dummyimage.com/550x400/E6E6E6/0011ff"
            alt="빈 이미지"
          />
        </div>
      </div>
    </div>
  );
};

export default ConInfo;
