import instance from "../constants/instance";
import { useSetRecoilState } from "recoil";
import { favorites } from "../constants/atoms";

const SetFavorites = async () => {
  const SetFavorites = useSetRecoilState(favorites);
  const response = await instance.get("/performance/favorite-id");
  SetFavorites(response.data);
  return;
};

export default SetFavorites;
