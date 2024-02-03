import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateInput } from "./Validate";
import instance from "../../assets/constants/instance";

const Signup = () => {
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [phone, setPhone] = useState("");
  const [idMsg, setIdMsg] = useState("");
  const [pwMsg, setPwMsg] = useState("");
  const [pw2Msg, setPw2Msg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [nickNameMsg, setNickNameMsg] = useState("");
  const [phoneMsg, setPhoneMsg] = useState("");
  const [usableUserId, setUsableUserId] = useState(false);
  const [usableEmail, setUsableEmail] = useState(false);
  const [usablePhone, setUsablePhone] = useState(false);
  const [usableNickName, setUsableNickName] = useState(false);
  const [usablePw, setUsablePw] = useState(false);
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

  // const getFormData = (e) => {
  //   e.preventDefault();
  //   var formData = new FormData(e.currentTarget);
  //   // output as an object
  //   console.log(Object.fromEntries(formData));
  // };
  // const confirmEmail = () => {
  //   console.log(
  //     "리액트에서 이메일 인증을 구현하려면 서버 측에서 이메일을 보내고, 클라이언트 측에서는 이메일 링크를 클릭하여 인증하는 방식을 주로 사용"
  //   );
  // };
  const checkDuplicationId = () => {
    const disUsable = userData.map((x) => x.userId).includes(userId);
    if (disUsable) {
      setIdMsg("이미 존재하는 아이디입니다.");
    } else if (userId === "") {
      setIdMsg("아이디를 입력해주세요");
    } else if (validateInput("userId", userId) && !disUsable) {
      setIdMsg("사용가능한 아이디 입니다.");
      setUsableUserId(true);
    }
  };
  const onChangeUserId = (e) => {
    setUserId(e.target.value);
    if (e.target.value === "") {
      setIdMsg("");
      setUsableUserId(false);
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
      setUsablePw(false);
    } else if (validateInput("password", e.target.value) === true) {
      setPwMsg("");
      setUsablePw(true);
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
      setUsableEmail(false);
    } else if (validateInput("email", e.target.value) === true) {
      setEmailMsg("");
      setUsableEmail(true);
    } else {
      setEmailMsg("이메일을 정확히 입력해 주세요");
    }
  };
  const checkDuplicationNickName = () => {
    const disUsable = userData.map((x) => x.nickName).includes(nickName);
    if (nickName !== "" && disUsable) {
      setNickNameMsg("이미 존재하는 닉네임입니다.");
    } else if (!disUsable) {
      setNickNameMsg("사용가능한 닉네임 입니다.");
      setUsableNickName(true);
    } else if (nickName === "") {
      setNickNameMsg("닉네임을 입력해 주세요");
    }
  };
  const onChangeNickName = (e) => {
    setNickName(e.target.value);
    if (e.target.value === "") {
      setNickNameMsg("");
      setUsableNickName(false);
    } else if (e.target.value.length < 2) {
      setNickNameMsg("닉네임은 2글자 이상이어야 합니다.");
    } else if (validateInput("nickname", e.target.value) === true) {
      setNickNameMsg("닉네임 중복확인을 눌러주세요");
    } else {
      setNickNameMsg("닉네임은 영문,한글,숫자만 입력가능합니다.");
    }
  };
  const checkDuplicationPhone = () => {
    const disUsable = userData.map((x) => x.phone).includes(phone);
    if (phone !== "" && disUsable) {
      setPhoneMsg("이미 존재하는 번호입니다.");
    } else if (phone.length < 13 && !disUsable) {
      setPhoneMsg("번호는 11자리 여야 합니다.");
    } else if (validateInput("phone", phone) === true) {
      setPhoneMsg("사용가능한 번호 입니다.");
      setUsablePhone(true);
    }
  };

  const onChangePhone = (e) => {
    if (e.target.value === "") {
      setPhoneMsg("");
      setUsablePhone(false);
    } else if (validateInput("phone", e.target.value) === true) {
      setPhoneMsg("폰 번호 중복확인을 눌러주세요");
    } else if (e.target.value.length < 13) {
      setPhoneMsg("폰 번호는 11자리여야합니다.");
    } else {
      setPhoneMsg("010으로 시작해야합니다.");
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

    setPhone(inputValue);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setShowModal(true);

    try {
      if (!usableUserId) {
        setModalMsg("아이디를 확인해 주세요.");
        setTimeout(() => {
          setShowModal(false);
          setModalMsg("");
        }, 1000);
      } else if (!usablePw || pw !== pw2) {
        setModalMsg("비밀번호를 확인해주세요");
        setTimeout(() => {
          setShowModal(false);
          setModalMsg("");
        }, 1000);
      } else if (!usableEmail) {
        setModalMsg("이메일을 확인해주세요.");
        setTimeout(() => {
          setShowModal(false);
          setModalMsg("");
        }, 1000);
      } else if (!usablePhone) {
        setModalMsg("핸드폰 번호를 확인해 주세요");
        setTimeout(() => {
          setShowModal(false);
          setModalMsg("");
        }, 1000);
      } else if (!usableNickName) {
        setModalMsg("닉네임을 확인해 주세요");
        setTimeout(() => {
          setShowModal(false);
          setModalMsg("");
        }, 1000);
      } else if (
        usableEmail &&
        usableNickName &&
        usablePhone &&
        usablePw &&
        usableUserId &&
        pw === pw2
      ) {
        const data = {
          username: userId,
          email: email,
          password: pw,
          nickname: nickName,
          phoneNumber: `${phone}`,
          login_type: "HOME",
        };
        const response = await instance.post("/join", data);
        console.log(response.data);
        setModalMsg("회원가입이 완료 되었습니다.");
        setTimeout(() => {
          setShowModal(false);
          setModalMsg("");
          navigate("/login");
        }, 1000);
      }
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
                  <label htmlFor="phone">핸드폰 번호</label>
                  <span
                    className={
                      phoneMsg === "사용가능한 번호 입니다." ? "available" : ""
                    }
                  >
                    {phoneMsg}
                  </span>
                </div>
                <div className="input-container">
                  <input
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={onChangePhone}
                    maxLength={13}
                  />
                  <button
                    type="button"
                    className="signup-check"
                    onClick={checkDuplicationPhone}
                  >
                    중복확인
                  </button>
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
                    maxLength={10}
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
