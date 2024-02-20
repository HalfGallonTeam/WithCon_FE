import instance from "../constants/instance";

const setLists = async (request, setInfos, totalCount, setTotalCount) => {
  const response = await instance.get(request);
  const datas = await response.data;
  setInfos(datas.content);
  const length = datas.totalPages * datas.size;
  if (length !== totalCount) {
    setTotalCount(length);
  }
};

export default setLists;