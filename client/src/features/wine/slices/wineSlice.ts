import { Country } from "./../../../app/models/country";
import {
  allWine,
  getCountries,
  getFilters,
  getWineById,
} from "./wineAsyncThunks";
import { createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";
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
  searchTerm: null,
};

// initial state
const initialState: WineState = {
  allFetched: false,
  filtersFetched: false,
  status: "idle",
  filterStatus: "idle",
  countryStatus: "idle",
  countries: null,
  filterOptions: {
    countries: [],
    types: [],
  },
  wineParams: initialParams,
  metaData: null,
};

// adapter
const wineAdapter = createEntityAdapter<Wine>({
  selectId: (wine) => wine.wineId,
});

export const wineSlice = createSlice({
  name: "wine",
  initialState: wineAdapter.getInitialState<WineState>(initialState),
  reducers: {
    resetAll: () => wineAdapter.getInitialState<WineState>(initialState),
    triggerFetch: (state) => {
      state.allFetched = false;
      state.filtersFetched = false;
    },
    resetSearchParam: (state) => {
      state.wineParams.searchTerm = null;
    },
    setParams: (state, action) => {
      state.wineParams = {
        ...state.wineParams,
        ...action.payload,
        pageNumber: 1,
      };

      // trigger fetch

      state.allFetched = false;
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    setPageNumber: (state, action) => {
      state.wineParams.pageNumber = action.payload;
      state.allFetched = false;
    },
  },
  extraReducers: (builder) => {
    /* All wine
     */
    builder.addCase(allWine.fulfilled, (state, action) => {
      wineAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.allFetched = true;
    });
    builder.addCase(allWine.rejected, (state, action) => {
      state.status = "idle";
      console.log(action.payload);
    });

    /* Wine by id
     */
    builder.addCase(getWineById.fulfilled, (state, action) => {
      wineAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(getWineById.rejected, (state, action) => {
      state.status = "idle";
      console.log(action);
    });

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

    /* Wine Loading */
    builder.addMatcher(
      isAnyOf(allWine.pending, getWineById.pending),
      (state, action) => {
        state.status = "loading";
      }
    );
  },
});

export const wineSelectors = wineAdapter.getSelectors(
  (state: RootState) => state.wine
);

export const {
  setMetaData,
  setPageNumber,
  resetSearchParam,
  setParams,
  resetAll,
  triggerFetch,
} = wineSlice.actions;
