import { LastConsumed } from "./../../app/models/consumed";
import { LastPurchased } from "./../../app/models/statistics";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../app/api";
import { Statistics } from "../../app/models/statistics";

const namespace = "statistics";

interface StatisticsState {
  status: "idle" | "loading" | "rejected";
  statisticsFetched: boolean;
  wineStatistics: Statistics[];
  lastPurchased: LastPurchased[];
  lastConsumed: LastConsumed[];
}

const initialState: StatisticsState = {
  status: "idle",
  statisticsFetched: false,
  lastPurchased: [],
  wineStatistics: [],
  lastConsumed: [],
};

export const getStatistics = createAsyncThunk<Statistics[], void>(
  `${namespace}/fetchStatistics`,
  async (_, thunkAPI) => {
    try {
      // cancelToken
      const source = axios.CancelToken.source();
      thunkAPI.signal.addEventListener("abort", () => {
        source.cancel();
      });

      // fetch statistics
      const response = await api.Wine.getStatistics({
        cancelToken: source.token,
      });
      console.log(response);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const statisticsSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStatistics.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      getStatistics.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = "idle";
        state.wineStatistics = action.payload.data;
        state.lastPurchased = action.payload.lastPurchased;
        state.lastConsumed = action.payload.lastConsumed;
        state.statisticsFetched = true;
      }
    );
    builder.addCase(getStatistics.rejected, (state) => {
      state.status = "rejected";
      state.statisticsFetched = true;
    });
  },
});

//export const {} = statisticsSlice.actions;
