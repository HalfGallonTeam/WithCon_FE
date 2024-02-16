import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../../assets/constants/instance";

const ConInfo = () => {
  const [infoData, setInfoData] = useState({});
  const { concertTitle } = useParams();
  let loading = false;

  useEffect(() => {
    const fetchData = async () => {
      if (loading) return;
      loading = true;
      try {
        const response = await instance.get(`/performance/${concertTitle}`);
        setInfoData(response.data);
      } catch (error) {
        console.error(error, "에러");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="info-container">
      <div className="info">
        <div className="info-img">
          <img src={infoData.poster} alt={infoData.name} />
          <span> ❤️ {infoData.likes}</span>
        </div>
        <div className="description">
          <ul className="info-items">
            <li className="info-item">
              <span className="item-name">공연이름</span>
              <div>
                <span>{infoData.name}</span>
              </div>
            </li>
            <li className="info-item">
              <span className="item-name">공연자</span>
              <div>
                <span>아직몰라요 지워도 돼요</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="map">
        <div className="contact">
          <span>위치: {infoData.facility}</span>
          <span>Tel : 12 - 345 - 6789 아직몰라요지워도돼요</span>
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
