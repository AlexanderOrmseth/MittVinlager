import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PaginatedResponse } from "../../app/models/pagination";
import {
  FormModel,
  Wine,
  WineBaseModel,
  WineFilters,
} from "../../app/models/wine";
import { RootState } from "../../app/store/configureStore";
import { WineParams } from "../../app/models/params";
import { serialize } from "object-to-formdata";
import { Country } from "../../app/models/country";
import { StatisticsResponse } from "../../app/models/statistics";
import { Consumed } from "../../app/models/consumed";

const BASE_URL = process.env.REACT_APP_API_URL;

/*
 *   TODO:
 *
 *   // find out if i should send void/undefined/null without parameters
 *   queryCacheKey: 'getStatistics(undefined)',
 *
 *   //PARSING_ERROR on some rejected -> they still work tho?? wut
 *
 *
 *
 * */

export const apiSlice = createApi({
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
                id: wineId,
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
    getWineById: builder.query<Wine, number | undefined>({
      query(id) {
        return {
          url: `/wine/${id}`,
          method: "GET",
        };
      },
      providesTags: (result, error, id) => [
        { type: "Wines", id: result?.wineId },
      ],
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
      invalidatesTags: (result, error, arg) => [
        { type: "Wines", id: arg },
        { type: "Statistics", id: "LIST" },
        { type: "Filter", id: "LIST" },
      ],
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
      invalidatesTags: [
        { type: "Wines", id: "LIST" },
        { type: "Statistics", id: "LIST" },
        { type: "Filter", id: "LIST" },
      ],
    }),
    /* Update wine
     * */
    updateWine: builder.mutation<Wine, { id: number; data: FormModel }>({
      query({ id, data }) {
        return {
          url: `/wine/${id}`,
          method: "PUT",
          body: serialize(data),
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Wines", id: arg.id },
        { type: "Statistics", id: "LIST" },
        { type: "Filter", id: "LIST" },
      ],
    }),
    /*
     *  Get wine statistics
     * */
    getStatistics: builder.query<StatisticsResponse, void>({
      query() {
        return {
          url: "wine/statistics",
          method: "GET",
        };
      },
      providesTags: [{ type: "Statistics", id: "LIST" }],
    }),
    /*
     *  Get wine filters
     * */
    getWineFilters: builder.query<WineFilters, void>({
      query() {
        return {
          url: "wine/filters",
          method: "GET",
        };
      },
      providesTags: [{ type: "Filter", id: "LIST" }],
    }),
    /*
     *  Get Countries from vinmonopolet
     * */
    getVinmonopoletCountries: builder.query<Country[], void>({
      query() {
        return {
          url: "vinmonopolet/countries",
          method: "GET",
        };
      },
    }),
    getVinmonopoletWine: builder.query<WineBaseModel, string>({
      query(productId) {
        return {
          url: `vinmonopolet/${productId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetAllWineQuery,
  useGetWineByIdQuery,
  useDeleteWineMutation,
  useAddWineMutation,
  useUpdateWineMutation,
  useGetStatisticsQuery,
  useGetVinmonopoletCountriesQuery,
  useGetWineFiltersQuery,
  useGetVinmonopoletWineQuery,
} = apiSlice;
