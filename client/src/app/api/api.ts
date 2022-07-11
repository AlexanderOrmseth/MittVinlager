import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import toast from "react-hot-toast";
import {serialize} from "object-to-formdata";
import {PaginatedResponse} from "../models/pagination";
import {FormModel} from "../models/wine";
import {WishItem} from "../models/wishItem";
import {store} from "../store/configureStore";
import {ExternalLogin} from "../models/externalLogin";

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
    const {data, status}: any = error.response;
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
    axios.get(url, {params, ...config}).then(res),
  post: (url: string, body: {}) => axios.post(url, body).then(res),
  delete: (url: string) => axios.delete(url).then(res),
  postForm: (url: string, data: FormData) =>
    axios
      .post(url, data, {
        headers: {"Content-type": "multipart/form-data"},
      })
      .then(res),
  putForm: (url: string, data: FormData) =>
    axios
      .put(url, data, {
        headers: {"Content-type": "multipart/form-data"},
      })
      .then(res),
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
  getCountries: () => requests.get("vinmonopolet/countries"),
};

const Wine = {
  allWine: (params: URLSearchParams, config?: AxiosRequestConfig) =>
    requests.get("wine", params, config),
  getWineById: (id: number) => requests.get(`wine/${id}`),
  getFilters: () => requests.get("wine/filters"),
  addWine: (newWine: FormModel) =>
    requests.postForm("wine", serialize(newWine)),
  updateWine: (updatedWine: FormModel, id: number) =>
    requests.putForm(`wine/${id}`, serialize(updatedWine)),
  deleteWine: (id: number) => requests.delete(`wine/${id}`),
  getStatistics: (config?: AxiosRequestConfig) =>
    requests.get("wine/statistics", undefined, config),
};

const Consumed = {
  getConsumed: (wineId: number) => requests.get(`wine/consumed/${wineId}`),
  addConsumed: (wineId: number, date: Date) =>
    requests.post(`wine/consumed/${wineId}`, date),
  deleteConsumed: (consumedId: number) =>
    requests.delete(`wine/consumed/${consumedId}`),
};

const Wishlist = {
  getWishlist: (config?: AxiosRequestConfig) =>
    requests.get("wishlist", undefined, config),
  deleteWishItem: (id: number) => requests.delete(`wishlist/${id}`),
  addWishItem: (newWishItem: WishItem) =>
    requests.post("wishlist", newWishItem),
};

const api = {
  Account,
  Vinmonopolet,
  Wine,
  Consumed,
  Wishlist,
};

export default api;
