import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateInput } from "./Validate";
import instance from "../../assets/constants/instance";
import SignUpInput, { onInputChange } from "./SignupForm";

const Signup = () => {
  const [userData, setUserData] = useState([]);
  const [data, setData] = useState({
    userId: "",
    pw: "",
    pw2: "",
    nickname: "",
    phone: "",
  });
  const [msgs, setMsgs] = useState({
    userIdMsg: "",
    pwMsg: "",
    pw2Msg: "",
    nicknameMsg: "",
    phoneMsg: "",
  });
  const [usables, setUsables] = useState({
    userId: false,
    phone: false,
    nickname: false,
    pw: false,
  });
  const [modalMsg, setModalMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await instance.get("/user");
        setUserData(response.data);
      } catch (error) {
        console.error(error, "에러");
      }
    };
    fetchData();
  }, []);

  const checkDuplicationId = () => {
    const disUsable = userData.map((x) => x.userId).includes(data.userId);
    if (disUsable) {
      setMsgs((prevState) => ({
        ...prevState,
        userIdMsg: "이미 존재하는 아이디입니다.",
      }));
    } else if (data.userId === "") {
      setMsgs((prevState) => ({
        ...prevState,
        userIdMsg: "아이디를 입력해주세요",
      }));
    } else if (validateInput("userId", data.userId) && !disUsable) {
      setMsgs((prevState) => ({
        ...prevState,
        userIdMsg: "사용가능한 아이디 입니다.",
      }));
      setUsables((prevState) => ({ ...prevState, userId: true }));
    }
  };

  const checkDuplicationPhone = () => {
    const disUsable = userData.map((x) => x.phone).includes(data.phone);
    if (data.phone !== "" && disUsable) {
      setMsgs((prevState) => ({
        ...prevState,
        phoneMsg: "이미 존재하는 번호입니다.",
      }));
    } else if (data.phone.length < 13 && !disUsable) {
      setMsgs((prevState) => ({
        ...prevState,
        phoneMsg: "번호는 11자리 여야 합니다.",
      }));
    } else if (validateInput("phone", data.phone) === true) {
      setMsgs((prevState) => ({
        ...prevState,
        phoneMsg: "사용가능한 핸드폰 번호 입니다.",
      }));

      setUsables((prevState) => ({ ...prevState, phone: true }));
    }
  };

  const checkPw = (e) => {
    setData((prevState) => ({ ...prevState, pw2: e.target.value }));
    if (data.pw === e.target.value) {
      setMsgs((prevState) => ({
        ...prevState,
        pw2Msg: "",
      }));
    } else {
      setMsgs((prevState) => ({
        ...prevState,
        pw2Msg: "비밀번호가 다릅니다.",
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setShowModal(true);

    try {
      if (!usables.userId) {
        setModalMsg("아이디를 확인해 주세요.");
      } else if (!usables.pw || data.pw !== data.pw2) {
        setModalMsg("비밀번호를 확인해주세요");
      } else if (!usables.phone) {
        setModalMsg("핸드폰 번호를 확인해 주세요");
      } else if (!usables.nickname) {
        setModalMsg("닉네임을 확인해 주세요");
      } else if (
        usables.nickname &&
        usables.phone &&
        usables.pw &&
        usables.userId &&
        data.pw === data.pw2
      ) {
        const postData = {
          username: data.userId,
          password: data.pw,
          nickname: data.nickname,
          phoneNumber: `${data.phone}`,
          login_type: "HOME",
        };
        const response = await instance.post("/join", postData);
        console.log(response.data);
        setModalMsg("회원가입이 완료 되었습니다.");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
      setTimeout(() => {
        setShowModal(false);
        setModalMsg("");
      }, 1000);
    } catch (error) {
      console.error("error");
    }
  };
  return (
    <div className="middle-container">
      <div className="container">
        <div className="login-box">
          <h1 className="title">위드콘</h1>
          <form
            className="login-form"
            name="signup"
            action=""
            method="POST"
            onSubmit={onSubmit}
          >
            <div className="signup-container">
              <SignUpInput
                label="아이디"
                name="username"
                msg={msgs.userIdMsg}
                value={data.userId}
                onChange={(e) =>
                  onInputChange(e, setData, setMsgs, setUsables, "userId")
                }
                onClick={checkDuplicationId}
                type="text"
                maxLength={12}
              />

              <SignUpInput
                label="비밀번호"
                name="password"
                msg={msgs.pwMsg}
                value={data.pw}
                onChange={(e) =>
                  onInputChange(e, setData, setMsgs, setUsables, "pw")
                }
                type="password"
                maxLength={12}
                minLength={8}
              />

              <SignUpInput
                label="비밀번호 확인"
                name="password2"
                msg={msgs.pw2Msg}
                value={data.pw2}
                onChange={checkPw}
                type="password"
              />

              <SignUpInput
                label="핸드폰 번호"
                name="phone"
                msg={msgs.phoneMsg}
                value={data.phone}
                onChange={(e) =>
                  onInputChange(e, setData, setMsgs, setUsables, "phone")
                }
                onClick={checkDuplicationPhone}
                type="tel"
                maxLength={13}
              />

              <SignUpInput
                label="닉네임"
                name="nickname"
                msg={msgs.nicknameMsg}
                value={data.nickname}
                onChange={(e) =>
                  onInputChange(e, setData, setMsgs, setUsables, "nickname")
                }
                type="text"
                minLength={2}
                maxLength={10}
              />
              <button type="submit" className="login-button">
                회원가입하기
              </button>
            </div>
          </form>
          {showModal === true ? (
            <div className="signup-modal">{modalMsg}</div>
          ) : null}
          <hr aria-hidden="true" />
          <p className="login-desc">
            아이디가 있으신가요?{" "}
            <Link to="/login/">
              <span style={{ fontWeight: "700" }}>로그인하기</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
