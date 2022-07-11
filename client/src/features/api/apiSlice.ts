import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PaginatedResponse } from "../../app/models/pagination";
import { FormModel, Wine } from "../../app/models/wine";
import { RootState } from "../../app/store/configureStore";
import { WineParams } from "../../app/api/params";
import { serialize } from "object-to-formdata";

const BASE_URL = process.env.REACT_APP_API_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Wines"],
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
    /* Get all wine
     * */
    getAllWine: builder.query<PaginatedResponse<Wine[]>, WineParams>({
      query: (params) => ({
        url: "wine",
        method: "GET",
        params: params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ wineId }) => ({
                type: "Wines" as const,
                wineId,
              })),
              { type: "Wines", id: "LIST" },
            ]
          : [{ type: "Wines", id: "LIST" }],
      // return a paginated response
      transformResponse: (response: Wine[] | [], meta, arg) => {
        const pagination = meta?.response?.headers.get("pagination");
        // response from api is just an array wine[]
        // convert the response to a paginated response
        if (pagination) {
          return {
            items: response,
            metaData: JSON.parse(pagination),
          };
        }
        return { items: response, metaData: null };
      },
    }),
    /* Get wine by id
     * */
    getWineById: builder.query<Wine, string | undefined>({
      query(id) {
        return {
          url: `/wine/${id}`,
          method: "GET",
        };
      },
      providesTags: (result, error, id) => [{ type: "Wines", id }],
    }),
    /* Delete wine by id
     * */
    deleteWine: builder.mutation<void, number>({
      query(id) {
        return {
          url: `/wine/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Wines", id: "LIST" }],
    }),
    /* Add wine
     * */
    addWine: builder.mutation<Wine, FormModel>({
      query(data) {
        return {
          url: "/wine",
          method: "POST",
          body: serialize(data),
        };
      },
      invalidatesTags: [{ type: "Wines", id: "LIST" }],
    }),
    /* Update wine
     * */
    updateWine: builder.mutation<Wine, { id: string; data: FormModel }>({
      query({ id, data }) {
        return {
          url: `/wine/${id}`,
          method: "PUT",
          body: serialize(data),
        };
      },
      invalidatesTags: [{ type: "Wines", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllWineQuery,
  useGetWineByIdQuery,
  useDeleteWineMutation,
  useAddWineMutation,
  useUpdateWineMutation,
} = apiSlice;
