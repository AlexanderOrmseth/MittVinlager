import { apiSlice } from "../../api/apiSlice";
import { Consumed } from "../../../app/models/consumed";

const detailsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* Get all dates
     * */
    getConsumedDatesByWineId: builder.query<Consumed[], number>({
      query(wineId) {
        return {
          url: `wine/consumed/${wineId}`,
          method: "GET",
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Consumed" as const,
                id: id,
              })),
              { type: "Consumed", id: "LIST" },
            ]
          : [{ type: "Consumed", id: "LIST" }],
    }),
    /* Delete consumed date
     * */
    deleteConsumedDateById: builder.mutation<void, number>({
      query(id) {
        return {
          url: `wine/consumed/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Consumed", id: arg },
        { type: "Statistics", id: "LIST" },
      ],
    }),
    /* Add consumed date
     * */
    addConsumedDate: builder.mutation<Consumed, { id: number; data: Date }>({
      query({ id, data }) {
        return {
          url: `wine/consumed/${id}`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Consumed", id: "LIST" },
        { type: "Statistics", id: "LIST" },
        // removes 1 from wine quantity -> so need to invalidate Wines
        // Todo: This would also need to re-fetch filters later if I add a filter for displaying what is in storage!
        {
          type: "Wines",
          id: arg.id,
        },
      ],
    }),
  }),
});

export const {
  useGetConsumedDatesByWineIdQuery,
  useDeleteConsumedDateByIdMutation,
  useAddConsumedDateMutation,
} = detailsApi;
