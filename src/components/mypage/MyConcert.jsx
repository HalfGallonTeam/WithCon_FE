import ConcertCard from "../concert/ConcertCard";
import { concertInfos as info } from "../concert/ConLists";

const MyConcert = () => {
  return (
    <div className="mypage-like-list">
      <div className="concert-list">
        <ConcertCard info={info[0]} />
        <ConcertCard info={info[1]} />
        <ConcertCard info={info[2]} />
        <ConcertCard info={info[3]} />
        <ConcertCard info={info[4]} />
        <ConcertCard info={info[5]} />
      </div>
    </div>
  );
};

export default MyConcert;
