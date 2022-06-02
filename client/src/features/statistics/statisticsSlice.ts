import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../app/api";
import { Statistics } from "../../app/models/statistics";

const namespace = "statistics";

interface StatisticsState {
  status: "idle" | "loading" | "rejected";
  statisticsFetched: boolean;
  wineStatistics: Statistics[];
  history: null;
}

const initialState: StatisticsState = {
  status: "idle",
  statisticsFetched: false,
  wineStatistics: [],
  history: null,
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

      // fetch wine
      const response = await api.Wine.getStatistics({
        cancelToken: source.token,
      });

      return response.query;
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
    builder.addCase(getStatistics.fulfilled, (state, action) => {
      state.status = "idle";
      state.wineStatistics = action.payload;
      state.statisticsFetched = true;
    });
    builder.addCase(getStatistics.rejected, (state) => {
      state.status = "rejected";
      state.statisticsFetched = true;
    });
  },
});

export const {} = statisticsSlice.actions;
