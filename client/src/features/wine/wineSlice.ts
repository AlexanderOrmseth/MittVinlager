import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderBy, WineParams } from "../../app/models/params";
import { RootState } from "../../app/store/configureStore";

// wine state
interface WineState {
  gridView: boolean;
  orderByDescending: boolean;
  wineParams: WineParams;
}

export const initialParams: WineParams = {
  pageNumber: 1,
  orderBy: "name",
  countries: [],
  grapes: "",
  recommendedFood: [],
  types: [],
  searchTerm: "",
  favoriteOption: "",
  storageOption: "",
};

// initial state
const initialState: WineState = {
  gridView: true,
  orderByDescending: false,
  wineParams: initialParams,
};

export const wineSlice = createSlice({
  name: "wine",
  initialState: initialState,
  reducers: {
    resetAll: () => initialState,
    resetParams: (state) => {
      state.wineParams = {
        ...state.wineParams,
        pageNumber: 1,
        countries: [],
        types: [],
        searchTerm: "",
        grapes: "",
        favoriteOption: "",
        storageOption: "",
        recommendedFood: [],
      };
    },
    setOrderBy: (state, action: PayloadAction<OrderBy>) => {
      state.wineParams = {
        ...state.wineParams,
        orderBy: action.payload,
      };
    },
    setOrderByDescending: (state, action: PayloadAction<boolean>) => {
      state.orderByDescending = action.payload;
    },
    setParams: (state, action) => {
      state.wineParams = {
        ...state.wineParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    setGridView: (state, action: PayloadAction<boolean>) => {
      state.gridView = action.payload;
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
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
  setOrderByDescending,
  setOrderBy,
  setParams,
  resetParams,
  resetAll,
  setGridView,
} = wineSlice.actions;
