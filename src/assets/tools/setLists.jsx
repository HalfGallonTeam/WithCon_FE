import instance from "../constants/instance";

const setLists = async (
  request,
  setInfos,
  totalCount,
  setTotalCount,
  setDatas
) => {
  const response = await instance.get(request);
  console.log(response, "setLists");
  const datas = await response.data;
  if (datas.content.length !== 0) {
    setInfos(datas.content);
  } else {
    setInfos(0);
  }
  if (setDatas) {
    setDatas(datas.content);
  }
  const length = datas.totalElements;
  if (length !== totalCount) {
    setTotalCount(length);
  }
};

export default setLists;
