import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import { AuthResponse } from "../../app/services/authApi";

interface AccountState {
  user: User | null;
  token: string | null | undefined;
}

const initialState: AccountState = {
  user: null,
  token: null
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
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<AuthResponse>) => {
      const { token, userName, email } = action.payload;

      // get roles
      let claims = JSON.parse(atob(token.split(".")[1]));
      let roles =
        claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      // set user
      state.user = {
        userName,
        email,
        roles: typeof roles === "string" ? [roles] : roles
      };

      state.token = token;

      // set token to localStorage
      if (navigator.cookieEnabled) {
        localStorage.setItem("token", token);
      }
    }
  },
});

export const { signOut, setUser, setToken } = accountSlice.actions;
