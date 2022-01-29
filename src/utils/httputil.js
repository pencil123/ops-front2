import axios from "axios";

const instance = axios.create({});

instance.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Access-Token"] = token;
      return config;
    } else {
      delete config.headers["Access-Token"];
      return config;
    }
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log("返回数据：", response);
    if (response.data.code === 401) {
      console.log("没有token,访问拒绝 ");
      // eslint-disable-next-line no-undef
      window.open(process.env.REACT_APP_BASEURL + "/login", "_self");
    } else {
      return response;
    }
  },
  (error) => {
    Promise.reject(error);
  }
);

export default instance;
