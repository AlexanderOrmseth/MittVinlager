import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "../store/configureStore";

const BASE_URL = process.env.REACT_APP_API_URL;

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Wines", "Statistics", "Wishlist", "Filter", "Consumed"],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).account.token;
      // Pass token if exists
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
