import { useEffect, useState } from "react";
import ButtonModal from "../common/modal";
import EditProfileImg from "./EditProfileImg";
import instance from "../../assets/constants/instance";
import { validateInput } from "../login/Validate";
import PassWordCheck from "./PassWordCheck";

const Profile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [exitModal, setExitModal] = useState(false);
  const [passWordCheck, setPassWordCheck] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [edit, setEdit] = useState(false);
  const [usable, setUsable] = useState(false);
  const [userMeInfo, setUserMeInfo] = useState({});
  const [usersData, setUsersData] = useState([]);
  const [msgs, setMsgs] = useState({
    nicknameMsg: "",
    phoneMsg: "",
    passwordMsg: "",
    password2Msg: "",
  });
  const [pw2, setPw2] = useState("");
  const [sameCheck, setSameCheck] = useState(false);
  const [data, setData] = useState({
    nickname: "",
    phoneNumber: "",
    newPassword: "",
  });

  //모바일 설정 기준으로 세팅 > min-width 설정을 통해서 큰 화면이 보이도록.
  const checkDuplicationPhone = (e) => {
    e.preventDefault();
    const disUsable = usersData
      .map((x) => x.phonNumber)
      .includes(data.phoneNumber);
    if (data.phoneNumber !== "" && disUsable) {
      setMsgs((prev) => ({
        ...prev,
        ["phoneMsg"]: "이미 존재하는 번호입니다.",
      }));
    } else if (data.phoneNumber.length < 13 && !disUsable) {
      setMsgs((prev) => ({
        ...prev,
        ["phoneMsg"]: "번호는 11자리 여야 합니다.",
      }));
    } else if (validateInput("phone", data.phoneNumber) === true) {
      setMsgs((prev) => ({ ...prev, ["phoneMsg"]: "사용가능한 번호 입니다." }));
      setUsable(true);
    }
  };
  const onChangeNickName = (e) => {
    if (e.target.value === "") {
      setMsgs((prev) => ({ ...prev, ["nicknameMsg"]: "" }));
    } else if (e.target.value.length < 2) {
      setMsgs((prev) => ({
        ...prev,
        ["nicknameMsg"]: "닉네임은 2글자 이상이어야 합니다.",
      }));
    } else if (validateInput("nickname", e.target.value) !== true) {
      setMsgs((prev) => ({
        ...prev,
        ["nicknameMsg"]: "닉네임은 영문,한글,숫자만 입력가능합니다.",
      }));
    } else {
      setMsgs((prev) => ({
        ...prev,
        ["nicknameMsg"]: "",
      }));
    }
    setData((prev) => ({ ...prev, [`nickname`]: e.target.value }));
  };
  const onChangePhone = (e) => {
    if (e.target.value === "") {
      setMsgs((prev) => ({ ...prev, ["phoneMsg"]: "" }));
    } else if (validateInput("phone", e.target.value) === true) {
      setMsgs((prev) => ({
        ...prev,
        ["phoneMsg"]: "폰 번호 중복확인을 눌러주세요",
      }));
    } else if (e.target.value.length < 13) {
      setMsgs((prev) => ({
        ...prev,
        ["phoneMsg"]: "폰 번호는 11자리여야합니다.",
      }));
    } else {
      setMsgs((prev) => ({ ...prev, ["phoneMsg"]: "010으로 시작해야합니다." }));
    }
    let inputValue = e.target.value.replace(/[^0-9]/g, "");

    // 정규식을 사용하여 입력된 숫자에 따라 매번 자동으로 하이픈 추가
    inputValue = inputValue.replace(
      /(\d{3})(\d{0,4})(\d{0,4})/,
      function (_, p1, p2, p3) {
        let parts = [p1, p2, p3].filter(Boolean);
        return parts.join("-");
      }
    );

    setData((prev) => ({ ...prev, [`phoneNumber`]: inputValue }));
  };
  const submitInfo = async (e) => {
    e.preventDefault();
    if (userMeInfo[0].phoneNumber !== data.phoneNumber && !usable) {
      setModal(true);
      setModalText("핸드폰 번호의 중복확인을 눌러주세요");
      setTimeout(() => {
        setModal(false);
        setModalText("");
      }, 1000);
    }
    try {
      const response = await instance.patch("/userMe", data);
      console.log(response);
    } catch (error) {
      console.error("수정에러", error);
    }
  };
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await instance.get("/userMe");
        const data = await response.data;
        setUserMeInfo(data);
        setData({
          nickname: userMeInfo[0].nickname,
          phoneNumber: userMeInfo[0].phoneNumber,
        });
      } catch (error) {
        console.error("에러", error);
      }
    };
    const getUsersData = async () => {
      try {
        const response = await instance.get("/user");
        const data = await response.data;
        setUsersData(data);
      } catch (error) {
        console.error("에러", error);
      }
    };
    getUserInfo();
    getUsersData();
  }, []);

  const deleteUser = async () => {
    try {
      const response = await instance.delete("/member");
      if (response.status === 200) {
        setModal(true);
        setModalText("성공적으로 탈퇴되었습니다.");
        setTimeout(() => {
          setModal(false);
          setModalText("");
        }, 1000);
      }
    } catch (error) {
      console.error("탈퇴에러", error);
      setModal(true);
      setModalText("다시 시도 해주세요");
      setTimeout(() => {
        setModal(false);
        setModalText("");
      }, 1000);
    }
    setExitModal(false);
  };
  const onClickExit = () => {
    deleteUser();
  };

  const passwordChange = (e) => {
    if (e.target.value !== pw2) {
      setMsgs((prev) => ({
        ...prev,
        ["password2Msg"]: "비밀번호가 같지 않습니다.",
      }));
    } else if (e.target.value === pw2) {
      setMsgs((prev) => ({
        ...prev,
        ["password2Msg"]: "",
      }));
    }
    setData((prev) => ({
      ...prev,
      ["newPassword"]: e.target.value,
    }));

    if (e.target.value.length < 8 || e.target.value.length > 12) {
      setMsgs((prev) => ({
        ...prev,
        ["passwordMsg"]: "비밀번호는 8자 이상 12자 이하여야 합니다.",
      }));
    } else if (!validateInput("pw", e.target.value)) {
      setMsgs((prev) => ({
        ...prev,
        ["passwordMsg"]:
          "비밀번호는 영문, 숫자, 특수문자를 조합해서 작성해주세요.",
      }));
    } else {
      setMsgs((prev) => ({
        ...prev,
        ["passwordMsg"]: "",
      }));
    }
  };
  const password2Change = (e) => {
    setPw2(e.target.value);
    if (data.newPassword === e.target.value) {
      setMsgs((prev) => ({ ...prev, ["password2Msg"]: "" }));
    } else {
      setMsgs((prev) => ({
        ...prev,
        ["password2Msg"]: "비밀번호가 같지 않습니다.",
      }));
    }
  };

  return (
    <div className="container">
      <p className="location-desc">마이페이지 &gt; 프로필 변경</p>
      <div className="profile-edit-form">
        <EditProfileImg edit={edit} />
        <div className="edit-user-info">
          {edit ? (
            <form>
              <div className="info-edit-container">
                <i className="bi bi-person" aria-hidden="true"></i>
                <input
                  name="nickname"
                  type="text"
                  value={data.nickname}
                  onChange={onChangeNickName}
                  className="info-edit-input"
                  maxLength={10}
                />
              </div>
              {msgs.nicknameMsg ? (
                <span className="msgs">{msgs.nicknameMsg}</span>
              ) : null}
              <div className="info-edit-container">
                <i className="bi bi-phone" aria-hidden="true"></i>
                <input
                  name="phone"
                  type="tell"
                  className="info-edit-input"
                  value={data.phoneNumber}
                  onChange={onChangePhone}
                  maxLength={13}
                />
                <button
                  type="buttton"
                  onClick={checkDuplicationPhone}
                  className="edit-btn"
                >
                  중복 확인
                </button>
              </div>
              {msgs.phoneMsg ? (
                <span
                  className={`msgs ${
                    msgs.phoneMsg === "사용가능한 번호 입니다." ? "msgs-ok" : ""
                  }`}
                >
                  {msgs.phoneMsg}
                </span>
              ) : null}

              <div className="info-edit-container">
                <i className="bi bi-key" aria-hidden="true" />
                <input
                  name="password"
                  type="password"
                  className="info-edit-input"
                  placeholder="새로운 비밀번호"
                  value={data.password}
                  onChange={passwordChange}
                  minLength={8}
                  maxLength={12}
                />
              </div>
              {msgs.passwordMsg !== "" ? (
                <span className="msgs">{msgs.passwordMsg}</span>
              ) : null}
              <div className="info-edit-container">
                <i className="bi bi-check-all" aria-hidden="true" />
                <input
                  name="password2"
                  type="password"
                  className="info-edit-input"
                  placeholder="새로운 비밀번호 확인"
                  value={pw2}
                  onChange={password2Change}
                  minLength={8}
                  maxLength={12}
                />
              </div>
              {msgs.password2Msg !== "" ? (
                <span className="msgs">{msgs.password2Msg}</span>
              ) : null}
              <div className="user-pw-edit">
                <button className="edit-btn" onClick={submitInfo}>
                  적용
                </button>
                <button className="edit-btn" onClick={() => setEdit(false)}>
                  취소
                </button>
              </div>
            </form>
          ) : (
            <div className="user-profile-info-container">
              <div className="info-container">
                <i className="bi bi-person" aria-hidden="true"></i>
                <div className="info-div">{userMeInfo[0]?.nickname}</div>
              </div>
              <div className="info-container">
                <i className="bi bi-phone" aria-hidden="true"></i>
                <div className="info-div">{userMeInfo[0]?.phoneNumber}</div>
              </div>
              {passWordCheck ? (
                <PassWordCheck
                  setEdit={setEdit}
                  setPassWordCheck={setPassWordCheck}
                />
              ) : (
                <div className="user-pw-edit">
                  <button
                    className="edit-btn"
                    onClick={() => setPassWordCheck(true)}
                  >
                    프로필 수정하기
                  </button>
                  <button
                    className="edit-btn exit-red"
                    onClick={() => setExitModal(true)}
                  >
                    회원 탈퇴하기
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {modalOpen ? (
        <ButtonModal
          text="수정하시겠습니까?"
          buttonContainer="2"
          button1="확인"
          button2="취소"
          onClickButton1={() => setModalOpen(false)}
          onClickButton2={() => setModalOpen(false)}
        />
      ) : null}
      {exitModal ? (
        <ButtonModal
          text="정말 탈퇴하시겠습니까?"
          textColor="red"
          buttonContainer="2"
          button1="확인"
          button2="취소"
          onClickButton1={onClickExit}
          onClickButton2={() => setExitModal(false)}
        />
      ) : null}
      {modal ? <ButtonModal text={modalText} buttonContainer="0" /> : null}
    </div>
  );
};

export default Profile;
