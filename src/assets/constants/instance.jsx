import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    myCustomHeader: "headerTest",
  },
});

export default instance;
