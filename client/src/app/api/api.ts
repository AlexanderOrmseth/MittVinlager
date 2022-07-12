import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { PaginatedResponse } from "../models/pagination";
import { store } from "../store/configureStore";
import { ExternalLogin } from "../models/externalLogin";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 250));

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const res = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.getState().account.token;
  if (token) config.headers!.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    if (process.env.NODE_ENV === "development") await sleep();
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
      return response;
    }
    return response;
  },
  (error: AxiosError) => {
    const { data, status }: any = error.response;
    switch (status) {
      case 400:
        if (data.errors) {
          throw data.errors;
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 500:
        toast.error("Internal Server Error!");
        break;
      case 403:
        toast.error("You are not allowed to do that!");
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string, params?: URLSearchParams, config?: AxiosRequestConfig) =>
    axios.get(url, { params, ...config }).then(res),
  post: (url: string, body: {}) => axios.post(url, body).then(res),
  delete: (url: string) => axios.delete(url).then(res),
};

const Account = {
  currentUser: () => requests.get("account/currentUser"),
  deleteUser: () => requests.delete("account/delete"),
  externalLogin: (data: ExternalLogin) =>
    requests.post("account/externalLogin", data),
};

const Vinmonopolet = {
  getWineByProductId: (productId: string) =>
    requests.get(`vinmonopolet/${productId}`),
};

const Consumed = {
  getConsumed: (wineId: number) => requests.get(`wine/consumed/${wineId}`),
  addConsumed: (wineId: number, date: Date) =>
    requests.post(`wine/consumed/${wineId}`, date),
  deleteConsumed: (consumedId: number) =>
    requests.delete(`wine/consumed/${consumedId}`),
};

const api = {
  Account,
  Vinmonopolet,
  Consumed,
};

export default api;
