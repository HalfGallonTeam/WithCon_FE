import { useState } from "react";
import PropTypes from "prop-types";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

const CreateChatRoom = ({ onClose }) => {
  const [roomName, setRoomName] = useState("");
  const [tagLists, setTagLists] = useState("");
  const [numMember, setNumMember] = useState(2);
  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };
  const handleTagListsChange = (e) => {
    setTagLists(e.target.value);
  };
  const handleNumMember = (e) => {
    setNumMember(e.target.value);
  };
  const onClickIncrementButton = () => {
    if (numMember < 10) {
      setNumMember(numMember + 1);
    }
  };
  const onClickDecrementButton = () => {
    if (numMember > 2) {
      setNumMember(numMember - 1);
    }
  };

  return (
    <div className="create-room-container">
      <h1>채팅방 생성</h1>
      <div className="create-room">
        <div className="input-container">
          <label htmlFor="room-name">채팅방 제목</label>
          <input
            type="text"
            id="room-name"
            value={roomName}
            onChange={handleRoomNameChange}
            maxLength="30"
            placeholder="30글자까지 입력 가능합니다."
          />
        </div>
        <div className="input-container">
          <label htmlFor="tag">태그</label>
          <input
            type="text"
            id="tag"
            value={tagLists}
            onChange={handleTagListsChange}
            maxLength="30"
            placeholder="태그할 글자를 입력해주세요."
          />
        </div>
        <div className="room-member">
          <label htmlFor="member-num">인원수</label>
          <input
            type="number"
            id="member-num"
            value={numMember}
            onChange={handleNumMember}
          />
          <div className="member-num-btn">
            <button onClick={onClickIncrementButton}>
              <FiPlus />
            </button>
            <button onClick={onClickDecrementButton}>
              <FiMinus />
            </button>
          </div>
        </div>
        <div className="submit-btn-container">
          <button>만들기</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};
CreateChatRoom.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default CreateChatRoom;
