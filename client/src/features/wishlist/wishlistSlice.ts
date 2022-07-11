import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../app/api/api";
import {WishItem} from "../../app/models/wishItem";

const namespace = "wishlist";

interface WishlistState {
  status: "idle" | "loading" | "rejected";
  isFetched: boolean;
  wishItems: WishItem[] | null;
}

const initialState: WishlistState = {
  status: "idle",
  isFetched: false,
  wishItems: null,
};

export const getWishlist = createAsyncThunk<WishItem[], void>(
  `${namespace}/fetchWishlist`,
  async (_, thunkAPI) => {
    try {
      // cancelToken
      const source = axios.CancelToken.source();
      thunkAPI.signal.addEventListener("abort", () => {
        source.cancel();
      });

      // fetch wishlist
      const response = await api.Wishlist.getWishlist({
        cancelToken: source.token,
      });

      console.log(response);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data});
    }
  }
);

export const wishlistSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {
    triggerFetch: (state) => {
      state.isFetched = false;
    },
    removeWishlistItem: (state, action) => {
      state.wishItems =
        state.wishItems?.filter((item) => item.id !== action.payload) || null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWishlist.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getWishlist.fulfilled, (state, action) => {
      state.status = "idle";
      state.wishItems = action.payload;
      state.isFetched = true;
    });
    builder.addCase(getWishlist.rejected, (state) => {
      state.status = "rejected";
      state.isFetched = false;
    });
  },
});

export const {triggerFetch, removeWishlistItem} = wishlistSlice.actions;
