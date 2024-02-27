import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../../assets/constants/instance";
import KakaoMap from "./Map";

const ConInfo = () => {
  const [infoData, setInfoData] = useState({});
  const [detailData, setDetailData] = useState({});
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
    const fetchDetailData = async () => {
      try {
        const response = await instance.get(
          `/performanceDetail/${concertTitle}`
        );
        setDetailData(response.data);
      } catch (error) {
        console.error("performanceDetail관련에러 : ", error);
      }
    };
    fetchData();
    fetchDetailData();
  }, []);
  const formatPrice = (price) => {
    const formatter = new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      currencyDisplay: "narrowSymbol",
    });
    const formattedPrice = formatter.format(price);
    return formattedPrice.replace("₩", "₩ ");
  };
  return (
    <div className="info-container">
      <div className="info">
        <div className="info-img">
          <img src={infoData.poster} alt={infoData.name} />
          <span> ❤️ {infoData.likes}</span>
        </div>
        <div className="description">
          <ul className="info-items">
            <InfoContainer text="관람연령" data={detailData.age} />
            <InfoContainer text="공연이름" data={infoData.name} />
            <InfoContainer text="공연자" data={detailData.actors} />
            <InfoContainer text="장르" data={detailData.genre} />
            <InfoContainer text="공연 시간" data={detailData.run_time} />
            <InfoContainer
              text="공연 기간"
              data={`${infoData.startDate} ~ ${infoData.endDate}`}
            />
            <InfoContainer text="날짜" data={detailData.time} />
            <InfoContainer text="가격" data={formatPrice(detailData.price)} />
            <InfoContainer text="주관" data={detailData.company} />
          </ul>
        </div>
      </div>
      <div className="map">
        <div className="contact">
          <span>위치: {infoData.facility}</span>
        </div>
        <div className="map-img">
          <KakaoMap detailData={detailData} />
        </div>
      </div>
    </div>
  );
};

export default ConInfo;

const InfoContainer = ({ text, data }) => {
  return (
    <li className="info-item">
      <span className="item-name">{text}</span>
      <div>
        <span>{data}</span>
      </div>
    </li>
  );
};
