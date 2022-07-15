import { api } from "./api";
import { ExternalAuth } from "../models/externalAuth";

export interface AuthResponse {
  userName: string;
  token: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<AuthResponse, void>({
      query: () => ({
        url: "account/currentUser"
      }),
      keepUnusedDataFor: 0
    }),
    externalLogin: builder.mutation<AuthResponse, ExternalAuth>({
      query: (credentials) => ({
        url: "account/externalLogin",
        method: "POST",
        body: credentials
      }),
      invalidatesTags: [
        "Wines",
        "Filter",
        "Consumed",
        "Wishlist",
        "Statistics"
      ]
    }),
    deleteUser: builder.mutation<void, void>({
      query: () => ({
        url: "account/delete",
        method: "DELETE"
      }),
    })
  })
});

export const {
  useGetCurrentUserQuery,
  useDeleteUserMutation,
  useExternalLoginMutation
} = authApi;
