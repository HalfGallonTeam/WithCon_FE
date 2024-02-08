import { atom } from "recoil";

const access_token = atom({
  key: "token",
  default: null,
});

const favorites = atom({
  key: "favorite",
  default: null,
});

const userIn = atom({
  key: "user",
  default: false,
});

export { access_token, favorites, userIn };
