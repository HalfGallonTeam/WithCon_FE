import { useEffect } from "react";

const KakaoMap = (props) => {
  const { detailData } = props;
  const appKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;
  // 위도 경도 받아올 때

  useEffect(() => {
    const loadKakaoMapAPI = () => {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services&autoload=false`;
      document.head.appendChild(script);

      script.onload = () => {
        const { kakao } = window;
        //위도경도
        kakao.maps.load(() => {
          const container = document.getElementById("kakao-map");
          const options = {
            center: new kakao.maps.LatLng(detailData.lat, detailData.lot),
            level: 5,
          };
          const map = new kakao.maps.Map(container, options);
          const markerPosition = new kakao.maps.LatLng(
            detailData.lat,
            detailData.lot
          );
          const marker = new kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);
        });
      };
    };

    loadKakaoMapAPI();
  }, [detailData]);

  return <div id="kakao-map"></div>;
};

export default KakaoMap;
