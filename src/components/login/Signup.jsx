import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { validateInput } from "./Validate";

const Signup = () => {
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [idMsg, setIdMsg] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pw2Msg, setPw2Msg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [nickNameMsg, setNickNameMsg] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/test/user.json");
        setUserData(response.data);
      } catch (error) {
        console.error(error, "에러");
      }
    };
    fetchData();
  }, []);

  const getFormData = (e) => {
    e.preventDefault();
    var formData = new FormData(e.currentTarget);
    // output as an object
    console.log(Object.fromEntries(formData));
  };
  // const confirmEmail = () => {
  //   console.log(
  //     "리액트에서 이메일 인증을 구현하려면 서버 측에서 이메일을 보내고, 클라이언트 측에서는 이메일 링크를 클릭하여 인증하는 방식을 주로 사용"
  //   );
  // };
  const checkDuplicationId = () => {
    const disUsable = userData.map((x) => x.userId).includes(userId);
    if (disUsable) {
      setIdMsg("이미 존재하는 아이디입니다.");
    } else if (validateInput("userId", userId) && !disUsable) {
      setIdMsg("사용가능한 아이디 입니다.");
    } else if (!disUsable && userId !== "") {
      setIdMsg("아이디는 대소문자와 숫자만 입력가능합니다.");
    }
  };
  const onChangeUserId = (e) => {
    setUserId(e.target.value);
    if (e.target.value === "") {
      setIdMsg("");
    } else if (
      e.target.value !== "" &&
      validateInput("userId", e.target.value) === true
    ) {
      setIdMsg("아이디 중복확인을 눌러주세요");
    } else if (e.target.value.length < 2) {
      setIdMsg("아이디는 2글자 이상이어야 합니다.");
    } else {
      setIdMsg("아이디는 대소문자와 숫자만 입력가능합니다.");
    }
  };
  const onChangePw = (e) => {
    setPw(e.target.value);
    if (e.target.value === "") {
      setPwMsg("");
    } else if (validateInput("password", e.target.value) === true) {
      setPwMsg("");
    } else if (e.target.value.length < 8) {
      setPwMsg("비밀번호는 8-12글자여야 합니다.");
    } else {
      setPwMsg("영문, 숫자, 특수문자를 조합해서 작성해야합니다.");
    }
  };
  const checkPw = (e) => {
    setPw2(e.target.value);
    if (pw === e.target.value) {
      setPw2Msg("");
    } else {
      setPw2Msg("비밀번호가 다릅니다.");
    }
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setEmailMsg("");
    } else if (validateInput("email", e.target.value) === true) {
      setEmailMsg("");
    } else {
      setEmailMsg("이메일을 정확히 입력해 주세요");
    }
  };
  const checkDuplicationNickName = () => {
    const disUsable = userData.map((x) => x.nickName).includes(nickName);
    if (disUsable) {
      setNickNameMsg("이미 존재하는 닉네임입니다.");
    } else if (!disUsable) {
      setNickNameMsg("사용가능한 닉네임 입니다.");
    }
  };
  const onChangeNickName = (e) => {
    setNickName(e.target.value);
    if (e.target.value === "") {
      setNickNameMsg("");
    } else if (
      e.target.value !== "" &&
      validateInput("nickname", e.target.value) === true
    ) {
      setNickNameMsg("닉네임 중복확인을 눌러주세요");
    } else if (e.target.value.length < 2) {
      setNickNameMsg("닉네임은 2글자 이상이어야 합니다.");
    } else {
      setNickNameMsg("닉네임은 영문,한글,숫자만 입력가능합니다. ㅍ");
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
            onSubmit={getFormData}
          >
            <div className="signup-container">
              <div className="signup-box">
                <div className="label-box">
                  <label htmlFor="username" className="required">
                    아이디
                  </label>
                  <span
                    className={
                      idMsg === "사용가능한 아이디 입니다." ? "available" : ""
                    }
                  >
                    {idMsg}
                  </span>
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    id="username"
                    name="id"
                    autoComplete="username"
                    value={userId}
                    onChange={onChangeUserId}
                    maxLength={12}
                  />
                  <button type="button" onClick={checkDuplicationId}>
                    중복확인
                  </button>
                </div>
              </div>
              <div className="signup-box">
                <div className="label-box">
                  <label htmlFor="password" className="required">
                    비밀번호
                  </label>
                  <span>{pwMsg}</span>
                </div>
                <div className="input-container">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    value={pw}
                    minLength={8}
                    maxLength={12}
                    onChange={onChangePw}
                  />
                </div>
              </div>
              <div className="signup-box">
                <div className="label-box">
                  <label htmlFor="password2" className="required">
                    비밀번호 확인
                  </label>
                  <span>{pw2Msg}</span>
                </div>
                <div className="input-container">
                  <input
                    type="password"
                    id="password2"
                    name="password2"
                    autoComplete="new-password"
                    value={pw2}
                    onChange={checkPw}
                  />
                </div>
              </div>
              <div className="signup-box">
                <div className="label-box">
                  <label htmlFor="email" className="required">
                    이메일
                  </label>
                  <span>{emailMsg}</span>
                </div>
                <div className="input-container">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={onChangeEmail}
                  />
                  {/* <button
                    type="button"
                    className="signup-check"
                    onClick={confirmEmail}
                  >
                    인증
                  </button> */}
                </div>
              </div>
              <div className="signup-box">
                <div className="label-box">
                  <label htmlFor="nickname">닉네임</label>
                  <span
                    className={
                      nickNameMsg === "사용가능한 닉네임 입니다."
                        ? "available"
                        : ""
                    }
                  >
                    {nickNameMsg}
                  </span>
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={nickName}
                    onChange={onChangeNickName}
                    minLength={2}
                    maxLength={6}
                  />
                  <button
                    type="button"
                    className="signup-check"
                    onClick={checkDuplicationNickName}
                  >
                    중복확인
                  </button>
                </div>
              </div>
              <button className="login-button">회원가입하기</button>
            </div>
          </form>
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
