import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import { AuthResponse } from "../../app/services/authApi";

interface AccountState {
  user: User | null;
  token: string | null | undefined;
}

const initialState: AccountState = {
  user: null,
  token: null,
};

const namespace = "account";

export const accountSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.token = null;
      if (navigator.cookieEnabled) {
        localStorage.removeItem("token");
      }
    },
    setDisplayName: (state, action: PayloadAction<string>) => {
      state.user = {
        ...state.user,
        displayName: action.payload,
      };
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<AuthResponse>) => {
      const { token, displayName, createdAt } = action.payload;

      // get roles
      const claims = JSON.parse(atob(token.split(".")[1]));
      const roles =
        claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      // set user
      state.user = {
        displayName,
        createdAt: createdAt ?? null,
        roles: typeof roles === "string" ? [roles] : roles,
      };

      state.token = token;

      // set token to localStorage
      if (navigator.cookieEnabled) {
        localStorage.setItem("token", token);
      }
    },
  },
});

export const { signOut, setUser, setToken, setDisplayName } =
  accountSlice.actions;
