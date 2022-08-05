import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "../store/configureStore";

const BASE_URL = import.meta.env.DEV ? "http://localhost:5003/api/" : "/api/";

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
