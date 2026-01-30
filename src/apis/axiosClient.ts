import axios from "axios";
import queryString from "query-string";

const baseURL = `http://192.168.1.1:3001`;

const axiosClient = axios.create({
  baseURL,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
  config.headers = {
    Authorization: "",
    Accept: "application/json",
    ...config.headers,
  };

  if (config.data) {
    config.data = { ...config.data };
  }

  return config;
});

axiosClient.interceptors.response.use(
  (res) => {
    if (res.data && res.status >= 200 && res.status < 300) {
      return res.data;
    } else {
      return Promise.reject(res.data);
    }
  },
  (error) => {
    const { res } = error;

    return Promise.reject(res.data);
  },
);

export default axiosClient;
