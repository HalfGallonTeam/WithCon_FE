import { useState } from "react";
import instance from "../../assets/constants/instance";
const PassWordCheck = ({ setEdit, setPassWordCheck }) => {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const handleCheckCurrentPassWord = async () => {
    try {
      const response = await instance.post("/member/current-password-check", {
        password: password,
      });
      if (response.status === 200) {
        console.log("현재 비밀번호가 맞아요");
        setEdit(true);
        setPassWordCheck(false);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setMsg("비밀번호를 확인해주세요");
      }
      console.error("현재 비밀번호 입력관련 에러", error);
    }
  };
  const onChangeCurrentPassword = (e) => {
    setMsg("");
    setPassword(e.target.value);
  };
  return (
    <div className="current-password-check">
      <label className="current-password-label">
        현재 비밀번호를 입력해주세요.
      </label>
      <div>
        <input
          name="password"
          type="password"
          className="current-password"
          placeholder="현재 비밀번호"
          autoComplete="new-password"
          value={password}
          onChange={onChangeCurrentPassword}
        />
        <button className="edit-btn" onClick={handleCheckCurrentPassWord}>
          확인
        </button>
        <button className="edit-btn" onClick={() => setPassWordCheck(false)}>
          취소
        </button>
      </div>
      {msg ? <span className="current-password-msg">{msg}</span> : null}
    </div>
  );
};
export default PassWordCheck;
