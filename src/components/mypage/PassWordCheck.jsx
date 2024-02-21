import { useState } from "react";
import instance from "../../assets/constants/instance";
const PassWordCheck = ({ setEdit, setPassWordCheck }) => {
  const [password, setPassword] = useState("");
  const handleCheckCurrentPassWord = async () => {
    try {
      const response = await instance.post("/member/current-password-check", {
        newPassword: password,
      });
      if (response.status === 200) {
        console.log("현재 비밀번호가 맞아요");
        setEdit(true);
      }
    } catch (error) {
      if (error.response.status === 400) {
        console.log("현재 비밀번호가 틀렸음", error);
      }
      console.error("현재 비밀번호 입력관련 에러", error);
    }
  };
  console.log(password);
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
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <button className="edit-btn" onClick={handleCheckCurrentPassWord}> */}
        <button className="edit-btn" onClick={() => setEdit(true)}>
          확인
        </button>
        <button className="edit-btn" onClick={() => setPassWordCheck(false)}>
          취소
        </button>
      </div>
    </div>
  );
};
export default PassWordCheck;
