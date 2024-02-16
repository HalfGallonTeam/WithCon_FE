import { atom } from "recoil";

const favorites = atom({
  key: "favorite",
  default: null,
});

const userIn = atom({
  key: "user",
  default: false,
});

const userData = atom({
  key: "user-data",
  default: {},
});

export { favorites, userIn, userData };
