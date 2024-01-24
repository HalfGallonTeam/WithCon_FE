import { atom } from "recoil";

const access_token = atom({
  key: "token",
  default: null,
});

export { access_token };
