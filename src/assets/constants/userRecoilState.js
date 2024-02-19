import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export const isLoginState = atom({
  key: "isLogin",
  default: false,
});

const { persistAtom } = recoilPersist({
  key: "sessionStorage",
  storage: sessionStorage,
});

export const myInfoState = atom({
  key: "myInfo",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
