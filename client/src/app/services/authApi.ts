import { api } from "./api";
import { ExternalAuth } from "../models/externalAuth";

export interface AuthResponse {
  displayName?: string | null;
  token: string;
  createdAt?: string | null;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<AuthResponse, void>({
      query: () => ({
        url: "account/currentUser",
      }),
      keepUnusedDataFor: 0,
    }),
    externalLogin: builder.mutation<AuthResponse, ExternalAuth>({
      query: (credentials) => ({
        url: "account/externalLogin",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: [
        "Wines",
        "Filter",
        "Consumed",
        "Wishlist",
        "Statistics",
      ],
    }),
    deleteUser: builder.mutation<void, void>({
      query: () => ({
        url: "account/delete",
        method: "DELETE",
      }),
    }),
    changeDisplayName: builder.mutation<string, { displayName: string }>({
      query: ({ displayName }) => ({
        url: "account/displayName",
        method: "PATCH",
        body: { displayName },
      }),
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useDeleteUserMutation,
  useExternalLoginMutation,
  useChangeDisplayNameMutation,
} = authApi;
