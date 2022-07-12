import { apiSlice } from "../api/apiSlice";
import { BaseWishlistItem, WishlistResponse } from "../../app/models/wishlist";

const wishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /* Get wishlist
     * */
    getWishlist: builder.query<WishlistResponse, void>({
      query: () => ({
        url: "wishlist",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Wishlist" as const,
                id,
              })),
              { type: "Wishlist", id: "LIST" },
            ]
          : [{ type: "Wishlist", id: "LIST" }],
    }),
    /* Delete wishlist item
     * */
    deleteWishlistItem: builder.mutation<void, number>({
      query(id) {
        return {
          url: `/wishlist/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [{ type: "Wishlist", id: "LIST" }],
    }),
    /* Add wishlist item
     * */
    addWishlistItem: builder.mutation<WishlistResponse, BaseWishlistItem>({
      query(data) {
        return {
          url: "/wishlist",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: [{ type: "Wishlist", id: "LIST" }],
    }),
  }),
});

export const {
  // wishlist
  useGetWishlistQuery,
  useAddWishlistItemMutation,
  useDeleteWishlistItemMutation,
} = wishlistApi;
