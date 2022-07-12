import { createSelector, createSlice } from "@reduxjs/toolkit";
import { WineParams } from "../../app/models/params";
import { RootState } from "../../app/store/configureStore";

// wine state
interface WineState {
  gridView: boolean;
  wineParams: WineParams;
}

export const initialParams = {
  pageNumber: 1,
  orderBy: "name",
  countries: [],
  types: [],
  searchTerm: "",
};

// initial state
const initialState: WineState = {
  gridView: true,
  wineParams: initialParams,
};

export const wineSlice = createSlice({
  name: "wine",
  initialState: initialState,
  reducers: {
    resetAll: () => initialState,
    resetSearchParam: (state) => {
      state.wineParams.searchTerm = "";
    },
    resetParams: (state) => {
      state.wineParams = initialParams;
    },
    setParams: (state, action) => {
      state.wineParams = {
        ...state.wineParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    setGridView: (state, action) => {
      state.gridView = action.payload;
    },
    setPageNumber: (state, action) => {
      state.wineParams.pageNumber = action.payload;
    },
  },
});

export const getParams = createSelector(
  (state: RootState) => state.wine.wineParams,
  (state) => state
);

export const {
  setPageNumber,
  resetSearchParam,
  setParams,
  resetParams,
  resetAll,
  setGridView,
} = wineSlice.actions;
