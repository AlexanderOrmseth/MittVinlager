import { Country } from "./../../../app/models/country";
import { getCountries, getFilters } from "./wineAsyncThunks";
import {
  createSelector,
  createSlice,
  PayloadAction,
  Update,
} from "@reduxjs/toolkit";
import { WineParams } from "../../../app/api/params";
import { MetaData } from "../../../app/models/pagination";
import { Wine } from "../../../app/models/wine";
import { RootState } from "../../../app/store/configureStore";

// wine state
interface WineState {
  allFetched: boolean;
  filtersFetched: boolean;
  status: "loading" | "idle";
  filterStatus: "loading" | "idle";
  countryStatus: "loading" | "idle" | "failed";
  countries: Country[] | null;
  gridView: boolean;
  // filterOptions = filters for logged in user depending on users inventory.
  filterOptions: {
    countries: string[];
    types: string[];
  };
  wineParams: WineParams;
  metaData: MetaData | null;
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
  allFetched: false,
  filtersFetched: false,
  status: "idle",
  filterStatus: "idle",
  countryStatus: "idle",
  countries: null,
  gridView: true,
  filterOptions: {
    countries: [],
    types: [],
  },
  wineParams: initialParams,
  metaData: null,
};

export const wineSlice = createSlice({
  name: "wine",
  initialState: initialState,
  reducers: {
    resetAll: () => initialState,

    resetSearchParam: (state) => {
      state.wineParams.searchTerm = null;
    },
    resetParams: (state) => {
      state.wineParams = initialParams;
      state.allFetched = false;
    },
    setParams: (state, action) => {
      state.wineParams = {
        ...state.wineParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    decrementQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const update: Update<Wine> = {
        id: action.payload.id,
        changes: { userDetails: { quantity: action.payload.quantity - 1 } },
      };

      // update quantity
      //wineAdapter.updateOne(state, update);
    },
    setGridView: (state, action) => {
      state.gridView = action.payload;
    },

    setPageNumber: (state, action) => {
      state.wineParams.pageNumber = action.payload;
      state.allFetched = false;
    },
  },
  extraReducers: (builder) => {
    /* Filters
     */
    builder.addCase(getFilters.pending, (state) => {
      state.filterStatus = "loading";
    });
    builder.addCase(getFilters.fulfilled, (state, action) => {
      // set filter options
      state.filterOptions.countries = action.payload.countries;
      state.filterOptions.types = action.payload.types;
      state.filtersFetched = true;
      state.filterStatus = "idle";
    });
    builder.addCase(getFilters.rejected, (state, action) => {
      state.filterStatus = "idle";
      console.error("getFilters error", action.payload);
    });

    /* Countries
     */
    builder.addCase(getCountries.pending, (state, action) => {
      state.countryStatus = "loading";
    });
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.countries = action.payload;
      state.countryStatus = "idle";
    });
    builder.addCase(getCountries.rejected, (state, action) => {
      state.countryStatus = "failed";
      console.error("getCountries error", action.payload);
    });
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
  decrementQuantity,
} = wineSlice.actions;
