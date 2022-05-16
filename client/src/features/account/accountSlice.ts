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

export const signIn = createAsyncThunk<User, FieldValues>(
  "account/signIn",
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

// if nothing in local storage -> nothing will happen -> no request will happen
export const fetchCurrentUser = createAsyncThunk<User>(
  "account/fetchCurrentUser",
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

// if nothing in local storage -> nothing will happen -> no request will happen
export const deleteUser = createAsyncThunk<void>(
  "account/deleteUser",
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
  name: "account",
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
      toast.error("Session expired - please login again");
    });

    /* Delete user
     */
    builder.addCase(deleteUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.success("Brukeren er slettet.");
      state.status = "idle";
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      console.error(action.payload);
      state.status = "idle";
      throw action.payload;
    });

    /* Matchers
     */
    builder.addMatcher(
      isAnyOf(signIn.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
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
    builder.addMatcher(isAnyOf(signIn.rejected), (state, action) => {
      console.error(action.payload);
      throw action.payload;
    });
  },
});

export const { signOut, setUser } = accountSlice.actions;
