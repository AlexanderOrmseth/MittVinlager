import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PaginatedResponse } from "../../app/models/pagination";
import { Wine } from "../../app/models/wine";
import { RootState } from "../../app/store/configureStore";

const BASE_URL = process.env.REACT_APP_API_URL;

export const apiSlice = createApi({
  reducerPath: "api",
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

  endpoints: (builder) => ({
    getAllWine: builder.query({
      query: (params) => ({
        url: "wine",
        method: "GET",
        params: params,
      }),
      transformResponse: (response: PaginatedResponse<Wine[]>, meta, arg) => {
        const pagination = meta?.response?.headers.get("pagination");

        if (pagination) {
          return {
            items: response,
            metaData: JSON.parse(pagination),
          };
        }

        return { items: response, metaData: null };
      },
    }),
  }),
});

export const { useGetAllWineQuery } = apiSlice;
