import instance from "../constants/instance";
import { useSetRecoilState } from "recoil";
import { userData } from "../constants/atoms";

const SetUserdata = async () => {
  console.log("작동 setuserdata");
  const setUserdata = useSetRecoilState(userData);
  const response = await instance.get("/member/me");
  if (response.status === 200) {
    setUserdata(userData);
  }
  return;
};

export default SetUserdata;
