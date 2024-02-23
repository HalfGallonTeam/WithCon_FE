import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import instance from "../../assets/constants/instance";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { myInfoState } from "../../assets/constants/userRecoilState";

const CreateChatRoom = ({ onClose, performanceId }) => {
  const myId = useRecoilValue(myInfoState).username;
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [roomMsg, setRoomMsg] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [tagLists, setTagLists] = useState([]);
  const [showTagModal, setShowTagModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const roomNameInputRef = useRef(null);
  useEffect(() => {
    roomNameInputRef.current.focus();
  }, []);

  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
    setRoomMsg("");
  };

  const tagDown = (e) => {
    if (e.target.value === "") return;
    if (e.key === "Enter" && tagLists.length === 5) {
      setInputValue("");
      setShowTagModal(true);
      setTimeout(() => {
        setShowTagModal(false);
      }, 600);
      console.log("5개임 바이");
    } else if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      setTagLists([...tagLists, inputValue]);
      setInputValue("");
    }
  };
  const onClickRemove = (index) => {
    const updateTagLists = [...tagLists];
    updateTagLists.splice(index, 1);
    setTagLists(updateTagLists);
  };

  const handleCreateRoom = async () => {
    try {
      if (!roomName) {
        roomNameInputRef.current.focus();
        setRoomMsg("채팅방 제목을 적어주세요");
        return;
      }
      const num = Number(performanceId);
      const data = {
        name: roomName,
        performance_id: num,
        tags: tagLists,
      };
      const response = await instance.post("/chatRoom", data);
      if (response.status === 201) {
        const newChatroom = await response.data.id;
        const data2 = {
          performanceId: performanceId,
          chatRoomId: newChatroom,
        };
        const response2 = await instance.post(
          "/notification/subscribe-channel",
          data2
        );
        console.log("채팅방이 성공적으로 생성되었습니다.", response.data);
        setShowCompleteModal(true);
        setTimeout(() => {
          onClose();
          setShowCompleteModal(false);
          navigate(`/title/${performanceId}/chat/${newChatroom}`);
        }, 1500);
      }
    } catch (error) {
      console.error("채팅방 생성 오류", error);
    }
  };
  return (
    <div className="create-room-container">
      <h1>채팅방 생성</h1>
      <div className="create-room">
        <div className="input-container">
          <div className="label-wrap">
            <label htmlFor="room-name">채팅방 제목</label>
            {roomMsg ? <span>{roomMsg}</span> : null}
          </div>
          <input
            ref={roomNameInputRef}
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
          <div className="input-wrap">
            <input
              type="text"
              id="tag"
              maxLength="10"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="태그할 글자를 입력해주세요."
              onKeyDown={tagDown}
            />
          </div>
        </div>
        {showTagModal === true ? (
          <div className="modal">
            <span>해시태그는 5개까지 입력 가능합니다.</span>
          </div>
        ) : null}
        <div className="hashtag-lists-container">
          <ul className="hashtag-lists">
            {tagLists &&
              tagLists.map((tag, index) => (
                <li className="hashtag" key={index}>
                  <span>#{tag}</span>
                  <button
                    className="remove-btn"
                    onClick={() => onClickRemove(index)}
                  >
                    X
                  </button>
                </li>
              ))}
          </ul>
        </div>
        {showCompleteModal === true ? (
          <div className="modal">
            <span>채팅방이 생성되었습니다.</span>
          </div>
        ) : null}
        <div className="submit-btn-container">
          <button onClick={handleCreateRoom}>만들기</button>
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
