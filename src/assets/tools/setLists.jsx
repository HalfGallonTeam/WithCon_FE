import instance from "../constants/instance";

const setLists = async (request, setInfos, totalCount, setTotalCount) => {
  const response = await instance.get(request);
  console.log(response, "setLists");
  const datas = await response.data;
  setInfos(datas.content);
  const length = datas.totalElements;
  if (length !== totalCount) {
    setTotalCount(length);
  }
};

export default setLists;
