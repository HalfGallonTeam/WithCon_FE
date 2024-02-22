import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "userdata",
  storage: sessionStorage,
});

export const myInfoState = atom({
  key: "myInfo",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
