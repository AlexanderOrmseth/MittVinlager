import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import { User, UserResponse } from "../../app/models/user";
import api from "../../app/api/api";
import { ExternalLogin } from "../../app/models/externalLogin";

interface AccountState {
  status: "idle" | "loading";
  user: User | null;
  token: string | null | undefined;
}

const initialState: AccountState = {
  status: "idle",
  user: null,
  token: null,
};

const namespace = "account";

const addLocalStorageToken = (user: any) =>
  localStorage.setItem("token", user.token);

/* Sign In / Register
 */
export const signIn = createAsyncThunk<UserResponse, ExternalLogin>(
  `${namespace}/signIn`,
  async (data, thunkAPI) => {
    try {
      const user = await api.Account.externalLogin(data);
      addLocalStorageToken(user);
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

/* Fetch current user
 */
export const fetchCurrentUser = createAsyncThunk<UserResponse>(
  `${namespace}/fetchCurrentUser`,
  async (_, thunkAPI) => {
    // set token to state
    thunkAPI.dispatch(setToken(localStorage.getItem("token")));
    try {
      const user = await api.Account.currentUser();
      // set new generated token
      addLocalStorageToken(user);
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      // not gonna make a request at all
      if (!localStorage.getItem("token")) {
        return false;
      }
    },
  }
);

/* Delete user
 */
export const deleteUser = createAsyncThunk<void>(
  `${namespace}/deleteUser`,
  async (_, thunkAPI) => {
    try {
      await api.Account.deleteUser();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      // not gonna make a request at all
      if (!localStorage.getItem("token")) {
        return false;
      }
    },
  }
);

export const accountSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
    setToken: (state, action: PayloadAction<string | null | undefined>) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      let claims = JSON.parse(atob(action.payload.token.split(".")[1]));
      let roles =
        claims["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      state.user = {
        ...action.payload,
        roles: typeof roles === "string" ? [roles] : roles,
      };
    },
  },
  extraReducers: (builder) => {
    /* get current user
     */
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null;
      localStorage.removeItem("token");
      toast.error("Sessionen er utgått, venligst logg inn igjen.");
      state.status = "idle";
    });

    /* Delete user
     */
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.user = null;
      localStorage.removeItem("token");
      toast.success("Brukeren er slettet.");
      state.status = "idle";
    });

    /* Matchers
     */
    builder.addMatcher(
      isAnyOf(signIn.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        const token = action.payload.token;
        state.status = "idle";
        let claims = JSON.parse(atob(token.split(".")[1]));
        let roles =
          claims[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        state.token = token;
        state.user = {
          userName: action.payload.userName,
          email: action.payload.email,
          roles: typeof roles === "string" ? [roles] : roles,
        };
      }
    );

    /* Loading
     */
    builder.addMatcher(
      isAnyOf(signIn.pending, fetchCurrentUser.pending, deleteUser.pending),
      (state) => {
        state.status = "loading";
      }
    );

    /* Rejected
     */
    builder.addMatcher(
      isAnyOf(signIn.rejected, deleteUser.rejected),
      (state, action) => {
        state.status = "idle";
        console.error(action.payload);
        throw action.payload;
      }
    );
  },
});

export const { signOut, setToken } = accountSlice.actions;
