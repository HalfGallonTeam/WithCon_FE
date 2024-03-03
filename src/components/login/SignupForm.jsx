import { validateInput } from "./Validate";

const SignUpInput = ({
  label,
  name,
  msg,
  value,
  onChange,
  onClick,
  type,
  maxLength,
  minLength,
}) => {
  return (
    <>
      <tr>
        <td>
          <label htmlFor={name}>{label}</label>
        </td>
        <td>
          <div className="input-container">
            <input
              type={type}
              id={name}
              name={name}
              autoComplete={name}
              value={value}
              onChange={onChange}
              maxLength={maxLength}
              minLength={minLength}
            />
            {onClick && (
              <button type="button" onClick={onClick}>
                중복확인
              </button>
            )}
          </div>
        </td>
      </tr>
      <tr>
        <td
          colSpan={2}
          className={
            msg === `사용가능한 ${label} 입니다.` ? "msg available" : "msg"
          }
        >
          *{msg}
        </td>
      </tr>
    </>
  );
};

export default SignUpInput;

export const onInputChange = (e, setData, setMsgs, setUsables, name) => {
  const value = e.target.value;
  const validateFn = validateInput(name, value);
  if (name === "phone") {
    let inputValue = e.target.value.replace(/[^0-9]/g, "");
    inputValue = inputValue.replace(
      /(\d{3})(\d{0,4})(\d{0,4})/,
      function (_, p1, p2, p3) {
        let parts = [p1, p2, p3].filter(Boolean);
        return parts.join("-");
      }
    );

    setData((prevState) => ({ ...prevState, phone: inputValue }));
  } else {
    setData((prevState) => ({ ...prevState, [name]: value }));
  }

  if (value === "") {
    setMsgs((prevState) => ({ ...prevState, [`${name}Msg`]: "" }));
    setUsables((prevState) => ({ ...prevState, [name]: false }));
  } else if (validateFn) {
    if (name === "userId" || name === "phone") {
      setMsgs((prevState) => ({
        ...prevState,
        [`${name}Msg`]: "중복확인을 눌러주세요.",
      }));
    } else {
      setMsgs((prevState) => ({ ...prevState, [`${name}Msg`]: "" }));
      setUsables((prevState) => ({ ...prevState, [name]: true }));
    }
  } else {
    if (name === "pw") {
      if (value.length < 8) {
        setMsgs((prevState) => ({
          ...prevState,
          [`${name}Msg`]: "비밀번호는 8-12글자여야 합니다.",
        }));
      } else {
        setMsgs((prevState) => ({
          ...prevState,
          [`${name}Msg`]: "영문, 숫자, 특수문자를 조합해서 작성해야합니다.",
        }));
      }
    } else if (name === "userId" || name === "nickname") {
      if (value.length < 2) {
        setMsgs((prevState) => ({
          ...prevState,
          [`${name}Msg`]: "2글자 이상이어야 합니다.",
        }));
      } else {
        if (name === "userId") {
          setMsgs((prevState) => ({
            ...prevState,
            [`${name}Msg`]: "아이디는 대소문자와 숫자만 입력가능합니다.",
          }));
        } else {
          setMsgs((prevState) => ({
            ...prevState,
            [`${name}Msg`]: "닉네임은 영문,한글,숫자만 입력가능합니다.",
          }));
        }
      }
    } else {
      if (value.length < 13) {
        setMsgs((prevState) => ({
          ...prevState,
          phoneMsg: "폰 번호는 11자리여야합니다.",
        }));
      } else {
        setMsgs((prevState) => ({
          ...prevState,
          phoneMsg: "010으로 시작해야합니다.",
        }));
      }
    }
  }
};
