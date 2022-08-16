import { PaginatedResponse } from "../models/pagination";
import { Wine } from "../models/wine";
import { WineParams } from "../models/params";
import { serialize } from "object-to-formdata";
import { StatisticsResponse } from "../models/statistics";
import { api } from "./api";
import { WineFormData } from "../../features/wine/form/validationSchema";

export interface WineFilterOptionsResponse {
  countries: string[];
  recommendedFood: string[];
  types: string[];
  grapes: string[];
}

export const wineApi = api.injectEndpoints({
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
      transformResponse: (response: Wine[], meta) => {
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
      query: (id) => `/wine/${id}`,
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
      invalidatesTags: (result, error, arg) => [
        { type: "Wines", id: arg },
        { type: "Statistics", id: "LIST" },
        { type: "Filter", id: "LIST" },
      ],
    }),
    /* Add wine
     * */
    addWine: builder.mutation<Wine, WineFormData>({
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
    /* Add test data
     * */
    addTestData: builder.mutation<void, void>({
      query() {
        return {
          url: "/wine/testData",
          method: "POST",
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
    updateWine: builder.mutation<Wine, { id: number; data: WineFormData }>({
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
      query: () => "wine/statistics",
      providesTags: [{ type: "Statistics", id: "LIST" }],
    }),
    /*
     *  Get wine filters (user options)
     * */
    getWineFilters: builder.query<WineFilterOptionsResponse, void>({
      query: () => "wine/filters",
      providesTags: [{ type: "Filter", id: "LIST" }],
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
  useGetWineFiltersQuery,
  useAddTestDataMutation,
} = wineApi;
