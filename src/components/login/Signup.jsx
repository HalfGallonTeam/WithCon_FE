import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateInput } from "./Validate";
import SignUpInput, { onInputChange } from "./SignupForm";
import axios from "axios";
import Loading from "../common/Loading";

const Signup = () => {
  const [disUsable, setDisUsable] = useState({
    username: false,
    phoneNumber: false,
  });
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchDuplicateUserName = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/auth/username-duplication-check",
        {
          username: data.userId,
        }
      );

      if (response.status === 200) {
        setDisUsable((prev) => ({ ...prev, ["username"]: true }));
        setMsgs((prev) => ({
          ...prev,
          ["userIdMsg"]: "사용가능한 아이디 입니다.",
        }));
        setUsables((prevState) => ({ ...prevState, userId: true }));
      } else {
        // 다른 상태 코드에 대한 처리
        console.error("Server returned an error with status:", response.status);
        console.error("Error data:", response.data);
        // 예를 들어, 409 상태 코드에 대한 처리를 추가할 수 있습니다.
        if (response.status === 409) {
          // 중복 아이디 에러 처리
          setMsgs((prev) => ({
            ...prev,
            ["userIdMsg"]: "이미 존재하는 아이디입니다.",
          }));
        }
      }
    } catch (error) {
      // 에러 발생 시
      if (error.response) {
        // 서버 응답이 있는 경우

        // 예를 들어, 409 상태 코드에 대한 처리를 추가할 수 있습니다.
        if (error.response.status === 409) {
          // 중복 아이디 에러 처리
          setMsgs((prev) => ({
            ...prev,
            ["userIdMsg"]: "이미 존재하는 아이디입니다.",
          }));
        }
      } else {
        // 서버 응답이 없는 경우
        console.error("Network error:", error.message);
      }
    }
    setLoading(false);
  };
  const fetchDuplicatePhoneNumber = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/auth/phone-number-duplication-check",
        {
          phoneNumber: data.phone,
        }
      );
      if (response.status === 200) {
        setDisUsable((prev) => ({ ...prev, ["phoneNumber"]: true }));
        setMsgs((prev) => ({
          ...prev,
          ["phoneMsg"]: "사용가능한 핸드폰 번호 입니다.",
        }));
        setUsables((prevState) => ({ ...prevState, phone: true }));
      } else {
        if (response.status === 409) {
          setMsgs((prev) => ({
            ...prev,
            ["phoneMsg"]: "이미 존재하는 핸드폰 번호입니다.",
          }));
        }
      }
    } catch (error) {
      // 에러 발생 시
      if (error.response) {
        if (error.response.status === 409) {
          setMsgs((prev) => ({
            ...prev,
            ["phoneMsg"]: "이미 존재하는 핸드폰 번호입니다.",
          }));
        }
      } else {
        console.error("Network error:", error.message);
      }
    }
    setLoading(false);
  };

  const checkDuplicationId = async (e) => {
    e.preventDefault();
    if (data.userId === "" || !validateInput("userId", data.userId)) return;
    setDisUsable((prev) => ({ ...prev, ["username"]: false }));
    await fetchDuplicateUserName();
    // if (validateInput("userId", data.userId) && disUsable.username) {
    //   setUsables((prevState) => ({ ...prevState, userId: true }));
    // } else return;
  };

  const checkDuplicationPhone = async (e) => {
    e.preventDefault();
    if (data.userId === "" || !validateInput("phone", data.phone)) return;
    setDisUsable((prev) => ({ ...prev, ["phoneNumber"]: false }));
    await fetchDuplicatePhoneNumber();
    // if (validateInput("phone", data.phone) && disUsable.phoneNumber) {
    //   setUsables((prevState) => ({ ...prevState, phone: true }));
    // } else {
    //   return;
    // }
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
    if (!usables.userId) {
      setModalMsg("아이디를 확인해 주세요.");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 1000);
    } else if (!usables.pw || data.pw !== data.pw2) {
      setModalMsg("비밀번호를 확인해주세요");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 1000);
    } else if (!usables.phone) {
      setModalMsg("핸드폰 번호를 확인해 주세요");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 1000);
    } else if (!usables.nickname) {
      setModalMsg("닉네임을 확인해 주세요");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 1000);
    } else if (
      usables.nickname &&
      usables.phone &&
      usables.pw &&
      usables.userId &&
      data.pw === data.pw2
    ) {
      try {
        setLoading(true);
        const postData = {
          username: data.userId,
          password: data.pw,
          nickname: data.nickname,
          phoneNumber: `${data.phone}`,
          login_type: "HOME",
        };
        const response = await axios.post("/api/auth/join", postData);
        console.log(response.data);
        setLoading(false);
        setModalMsg("회원가입이 완료 되었습니다.");
        setShowModal(true);
        setTimeout(() => {
          navigate("/login");
          setShowModal(false);
          setModalMsg("");
        }, 1000);
      } catch (error) {
        console.error("error");
      }
    }
  };
  useEffect(() => {
    console.log(disUsable);
  }, [disUsable]);
  return (
    <div className="middle-container">
      <div className="container">
        <div className="login-box">
          <h1 className="title" onClick={() => navigate("/")}>
            위드콘
          </h1>
          {loading ? <Loading /> : null}
          <form
            className="login-form"
            name="signup"
            action=""
            method="POST"
            // onSubmit={onSubmit}
          >
            <table>
              <tbody>
                <SignUpInput
                  label="아이디"
                  name="username"
                  msg={msgs.userIdMsg}
                  value={data.userId}
                  onChange={(e) =>
                    onInputChange(e, setData, setMsgs, setUsables, "userId")
                  }
                  type="text"
                  maxLength={12}
                  onClick={checkDuplicationId}
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
                  label="비밀번호확인"
                  name="password2"
                  msg={msgs.pw2Msg}
                  value={data.pw2}
                  onChange={checkPw}
                  type="password"
                />

                <SignUpInput
                  label="핸드폰번호"
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
              </tbody>
            </table>
            <button type="button" className="login-button" onClick={onSubmit}>
              회원가입하기
            </button>
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
