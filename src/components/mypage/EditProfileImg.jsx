import { useEffect, useRef, useState } from "react";
import instance from "../../assets/constants/instance";
import ButtonModal from "../common/modal";
import { BsPersonFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { myInfoState } from "../../assets/constants/userRecoilState";

const EditProfileImg = () => {
  const [myInfo, setMyInfo] = useRecoilState(myInfoState);
  const [imageUrl, setImageUrl] = useState(myInfo.profileImage);
  const [imgFile, setImgFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [msgModal, setMsgModal] = useState(false);
  //test
  const fileInputRef = useRef(null);
  const handleImgChange = (e) => {
    const selectedImg = e.target.files[0];
    setImgFile(selectedImg);
    if (selectedImg && selectedImg.type.startsWith("image/")) {
      if (selectedImg.size <= 1024 * 1024) {
        const url = URL.createObjectURL(selectedImg);
        setImageUrl(url);
      } else {
        setMsgModal(true);
        setMsg("이미지 크기는 1MB를 초과할 수 없습니다.");
        setTimeout(() => {
          setMsgModal(false);
        }, 1000);
      }
    } else {
      setMsgModal(true);
      setMsg("올바른 이미지 넣어줭");
      setTimeout(() => setMsgModal(false), 1000);
    }
  };
  const submitImg = async () => {
    if (imgFile) {
      try {
        const formData = new FormData();
        formData.append("image", imgFile);
        //formData 확인용 마지막에 지워야함(start)
        for (let key of formData.keys()) {
          console.log(key);
        }
        for (let value of formData.values()) {
          console.log(value);
        }
        // (end)
        await instance.post("/member/profile-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        await UpdateMyInfo();
        console.log("수정완료");
      } catch (error) {
        console.error("이미지 업로드 에러", error);
      }
    }
  };

  const UpdateMyInfo = async () => {
    try {
      // console.log("작동 setuser");
      const response = await instance.get("/member/me");
      // console.log(response);
      const data = await response.data;
      if (response.status === 200) {
        setMyInfo(data);
      }
    } catch (error) {
      console.error(error, "에러");
    }
  };

  // useEffect(() => {
  //   const getUserInfo = async () => {
  //     try {
  //       const response = await instance.get("/member/me");
  //       const imgFile = await response.profileImage;
  //       const imgUrl = await URL.createObjectURL(imgFile);
  //       setImageUrl(imgUrl);
  //       prevImageUrl(imgUrl);
  //     } catch (error) {
  //       console.error("에러", error);
  //     }
  //   };
  //   getUserInfo();
  // }, []);
  return (
    <div className="edit-img-container">
      <div
        className="cancel-btn"
        onClick={() => setImageUrl(myInfo.profileImage)}
      >
        X
      </div>
      {imageUrl === null ? (
        <BsPersonFill className="profile-img border-img" />
      ) : (
        <img className="profile-img" src={imageUrl} alt="프로필 이미지" />
      )}
      <div className="edit-profile-img">
        <input
          type="file"
          accept="image/jpeg, image/png, image/gif, image/bmp, image/webp"
          capture="environment"
          className="img-input"
          onChange={handleImgChange}
          ref={fileInputRef}
        />
        <button
          className="edit-btn"
          onClick={() => fileInputRef.current.click()}
        >
          사진 찾기
        </button>
        <button className="edit-btn" onClick={submitImg}>
          수정 하기
        </button>
      </div>
      {msgModal ? <ButtonModal text={msg} buttonContainer="0" /> : null}
    </div>
  );
};
export default EditProfileImg;
