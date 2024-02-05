import { atom } from "recoil";

const access_token = atom({
  key: "token",
  default: null,
});

const favorites = atom({
  key: "favorite",
  default: null,
});

export { access_token, favorites };
