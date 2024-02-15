import instance from "../constants/instance";
import { useSetRecoilState } from "recoil";
import { userData } from "../constants/atoms";

const SetUserdata = async () => {
  const setUserdata = useSetRecoilState(userData);
  const response = await instance.get("/member/me");
  if (response.status === 200) {
    setUserdata(userData);
  }
  return;
};

export default SetUserdata;
