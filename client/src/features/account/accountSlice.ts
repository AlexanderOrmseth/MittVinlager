import { FieldValues } from "react-hook-form";
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../../app/api/";
import toast from "react-hot-toast";
import { User } from "../../app/models/user";

interface AccountState {
  status: "idle" | "loading";
  user: User | null;
}

const initialState: AccountState = {
  status: "idle",
  user: null,
};

const namespace = "account";

/* Register
 */
export const register = createAsyncThunk<User, FieldValues>(
  `${namespace}/register`,
  async (data, thunkAPI) => {
    try {
      const user = await agent.Account.register(data);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/* Sign In
 */
export const signIn = createAsyncThunk<User, FieldValues>(
  `${namespace}/signIn`,
  async (data, thunkAPI) => {
    try {
      const user = await agent.Account.login(data);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

/* Fetch current user
 */
export const fetchCurrentUser = createAsyncThunk<User>(
  `${namespace}/fetchCurrentUser`,
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!)));
    try {
      const user = await agent.Account.currentUser();
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      // not gonna make a request at all
      if (!localStorage.getItem("user")) {
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
      await agent.Account.deleteUser();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      // not gonna make a request at all
      if (!localStorage.getItem("user")) {
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
      localStorage.removeItem("user");
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
      localStorage.removeItem("user");
      toast.error("Sessionen er utgått, venligst logg inn igjen.");
    });

    /* Delete user
     */
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.success("Brukeren er slettet.");
      state.status = "idle";
    });

    /* Matchers
     */
    builder.addMatcher(
      isAnyOf(signIn.fulfilled, fetchCurrentUser.fulfilled, register.fulfilled),
      (state, action) => {
        state.status = "idle";
        let claims = JSON.parse(atob(action.payload.token.split(".")[1]));
        let roles =
          claims[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        state.user = {
          ...action.payload,
          roles: typeof roles === "string" ? [roles] : roles,
        };
      }
    );

    /* Loading
     */
    builder.addMatcher(
      isAnyOf(
        signIn.pending,
        fetchCurrentUser.pending,
        deleteUser.pending,
        register.pending
      ),
      (state) => {
        state.status = "loading";
      }
    );

    /* Rejected
     */
    builder.addMatcher(
      isAnyOf(signIn.rejected, register.rejected, deleteUser.rejected),
      (state, action) => {
        state.status = "idle";
        console.error(action.payload);
        throw action.payload;
      }
    );
  },
});

export const { signOut, setUser } = accountSlice.actions;
