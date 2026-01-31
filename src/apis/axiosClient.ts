import axios, { AxiosResponse } from "axios";
import queryString from "query-string";

const baseURL = `http://192.168.1.69:3001`;

const axiosClient = axios.create({
  baseURL,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  async (config: any) => {
    config.headers = {
      Authorization: "",
      Accept: "application/json",
      ...config.headers,
    };

    if (config.data) {
      config.data = { ...config.data };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.data && res.status >= 200 && res.status < 300) {
      return res.data;
    } else {
      return Promise.reject(res.data);
    }
  },
  (error) => {
    const { response } = error;
    return Promise.reject(response?.data || error);
  },
);

export default axiosClient;
