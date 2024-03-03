import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import instance from "../../assets/constants/instance";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { myInfoState } from "../../assets/constants/userRecoilState";
import Loading from "../common/Loading";

const CreateChatRoom = ({ onClose, performanceId }) => {
  const myId = useRecoilValue(myInfoState).memberId;
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [tagLists, setTagLists] = useState([]);
  const [showTagModal, setShowTagModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const roomNameInputRef = useRef(null);
  useEffect(() => {
    roomNameInputRef.current.focus();
  }, []);

  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
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
      setLoading(true);
      const data = {
        roomName: roomName,
        performanceId: performanceId,
        tags: tagLists,
      };
      console.log(data);
      const response = await instance.post("/chatRoom", data);
      if (response.status === 201) {
        const chatRoomId = await response.data.chatRoomId;
        const response2 = await instance.post(
          `/notification/subscribe-channel?chatRoomId=${chatRoomId}`
        );
        console.log("채팅방이 성공적으로 생성되었습니다.", response.data);
        setLoading(false);
        setShowCompleteModal(true);
        setTimeout(() => {
          onClose();
          setShowCompleteModal(false);
          navigate(`/chat-room/${chatRoomId}`);
        }, 1500);
      }
    } catch (error) {
      console.error("채팅방 생성 오류", error);

      setLoading(false);
    }
  };
  return (
    <div className="create-room-container">
      <h1>채팅방 생성</h1>
      {loading ? <Loading /> : null}
      <div className="create-room">
        <div className="input-container">
          <label htmlFor="room-name">제목</label>
          <input
            ref={roomNameInputRef}
            type="text"
            id="room-name"
            value={roomName}
            onChange={handleRoomNameChange}
            maxLength="30"
            placeholder="30글자까지 입력 가능합니다."
            required
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
              placeholder="태그 입력 후 엔터를 눌러주세요."
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
