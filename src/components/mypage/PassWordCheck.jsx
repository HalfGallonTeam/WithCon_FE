import { useState } from "react";
import instance from "../../assets/constants/instance";
import Loading from "../common/Loading";
const PassWordCheck = ({ setEdit, setPassWordCheck }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const handleCheckCurrentPassWord = async () => {
    try {
      setLoading(true);
      const response = await instance.post("/member/current-password-check", {
        password: password,
      });
      if (response.status === 200) {
        setEdit(true);
        setPassWordCheck(false);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setMsg("비밀번호를 확인해주세요");
      }
      console.error("현재 비밀번호 입력관련 에러", error);
    }
    setLoading(false);
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
      {loading ? <Loading /> : null}
      {msg ? <span className="current-password-msg">{msg}</span> : null}
    </div>
  );
};
export default PassWordCheck;
