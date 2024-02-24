import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import instance from "../../assets/constants/instance";

const ConDetail = () => {
  const [info, setInfos] = useState({});
  const navigate = useNavigate();
  const { concertTitle } = useParams();
  const [category, setCategory] = useState("detail");
  const categoryClick = () => {
    if (category === "detail") {
      setCategory("chat");
      navigate(`/title/${concertTitle}/chat`);
    } else if (category === "chat") {
      setCategory("detail");
      navigate(`/title/${concertTitle}`);
    }
  };

  let loading = false;
  useEffect(() => {
    const getInfos = async () => {
      if (loading) return;
      loading = true;
      try {
        const response = await instance.get(`/performance/${concertTitle}`);
        setInfos(response.data);
      } catch (error) {
        console.error(error, "에러");
      }
    };
    getInfos();
  }, []);
  return (
    <div className="detail-container">
      <div className="con-title-container">
        <div className="con-title">
          <h1 className="title">{info.name}</h1>
          <div className="mini-data">
            <span className="date">{`${info.startDate}-${info.endDate}`}</span>
            <span className="location">{info.facility}</span>
          </div>
        </div>
        <div className="con-category">
          <button onClick={categoryClick}>
            {category === "detail" ? "채팅방 목록" : "공연 상세정보"}
          </button>
        </div>
      </div>
      <div className="con-info">
        <Outlet />
      </div>
    </div>
  );
};

export default ConDetail;
