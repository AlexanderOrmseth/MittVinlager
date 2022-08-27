import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderBy, WineParams } from "../../app/models/params";
import { RootState } from "../../app/store/configureStore";
import { objWithoutNullValues } from "../../app/util/transform";

// wine state
interface WineState {
  gridView: boolean;
  hideFilter: boolean;
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
  priceTo: null,
  priceFrom: null
};

// initial state
const initialState: WineState = {
  gridView: true,
  hideFilter: false,
  orderByDescending: false,
  wineParams: initialParams
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
        priceTo: null,
        priceFrom: null,
        recommendedFood: []
      };
    },
    setOrderBy: (state, action: PayloadAction<OrderBy>) => {
      state.wineParams = {
        ...state.wineParams,
        orderBy: action.payload
      };
    },
    setTypeOnly: (state, action: PayloadAction<string>) => {
      state.wineParams = {
        ...state.wineParams,
        pageNumber: 1,
        countries: [],
        types: [action.payload],
        searchTerm: "",
        grapes: "",
        favoriteOption: "",
        storageOption: "",
        priceTo: null,
        priceFrom: null,
        recommendedFood: []
      };
    },
    setOrderByDescending: (state, action: PayloadAction<boolean>) => {
      state.orderByDescending = action.payload;
    },
    setParams: (state, action) => {
      state.wineParams = {
        ...state.wineParams,
        ...action.payload,
        pageNumber: 1
      };
    },
    setHideFilter: (state, action: PayloadAction<boolean>) => {
      state.hideFilter = action.payload;
    },
    setGridView: (state, action: PayloadAction<boolean>) => {
      state.gridView = action.payload;
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.wineParams.pageNumber = action.payload;
    }
  }
});

// params without null
export const getParams = createSelector(
  (state: RootState) => state.wine.wineParams,
  (state) => objWithoutNullValues(state)
);

export const {
  setPageNumber,
  setOrderByDescending,
  setOrderBy,
  setParams,
  resetParams,
  resetAll,
  setHideFilter,
  setGridView,
  setTypeOnly
} = wineSlice.actions;
