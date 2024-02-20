import { useEffect } from "react";

const KakaoMap = () => {
  const appKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;
  // 위도 경도 받아올 때
  const LatLng = { lat: 33.450701, lng: 126.570667 };
  useEffect(() => {
    const loadKakaoMapAPI = () => {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services&autoload=false`;

      script.onload = () => {
        const { kakao } = window;
        //위도경도
        kakao.maps.load(() => {
          const container = document.getElementById("kakao-map");
          const options = {
            center: new kakao.maps.LatLng(LatLng.lat, LatLng.lng),
            level: 5,
          };
          const map = new kakao.maps.Map(container, options);
          const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
          const marker = new kakao.maps.Marker({
            position: markerPosition,
          });
          marker.setMap(map);

          /*           //주소

          const geocoder = new kakao.maps.services.Geocoder();

          // 주소로 좌표를 검색합니다
          geocoder.addressSearch(
            "서울 강남구 영동대로 511",
            function (result, status) {
              // 정상적으로 검색이 완료됐으면
              if (status === kakao.maps.services.Status.OK) {
                const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                // 결과값으로 받은 위치를 마커로 표시합니다
                const marker = new kakao.maps.Marker({
                  map: map,
                  position: coords,
                });

                // 인포윈도우로 장소에 대한 설명을 표시합니다
                const infowindow = new kakao.maps.InfoWindow({
                  content:
                    '<div style="width:150px;text-align:center;padding:6px 0;">52층가고싶다</div>',
                });
                infowindow.open(map, marker);

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
              }
            }
          ); */
        });
      };
      document.head.appendChild(script);
    };

    loadKakaoMapAPI();
  }, [appKey]);

  return <div id="kakao-map"></div>;
};

export default KakaoMap;
