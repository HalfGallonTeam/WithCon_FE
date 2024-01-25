import { atom } from "recoil";

const save_naver_id_login = atom({
  key: "naver-js-sdk",
  default: null,
});

const access_token = atom({
  key: "token",
  default: null,
});

export { save_naver_id_login, access_token };
