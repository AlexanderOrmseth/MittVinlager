import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../app/api";
import { getAxiosParams } from "../../../app/api/params";
import { Wine } from "../../../app/models/wine";
import { RootState } from "../../../app/store/configureStore";
import { setMetaData } from "./wineSlice";

/* 
  A function that accepts a Redux action type string and a callback function that should return a promise.
  It generates promise lifecycle action types based on the action type prefix that you pass in,
  and returns a thunk action creator that will run the promise callback and 
  dispatch the lifecycle actions based on the returned promise. 
*/

const namespace = "wine";

/* 
  Fetch filters
*/
export const getFilters = createAsyncThunk(
  `${namespace}/getFilters`,
  async (_, thunkAPI) => {
    try {
      return await api.Wine.getFilters();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

/* 
  Fetch countries
*/
export const getCountries = createAsyncThunk(
  `${namespace}/getCountries`,
  async (_, thunkAPI) => {
    try {
      return await api.Vinmonopolet.getCountries();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

/* 
  All
 */
export const allWine = createAsyncThunk<Wine[], void, { state: RootState }>(
  `${namespace}/allWine`,
  async (_, thunkAPI) => {
    // get parameters from state
    const params = getAxiosParams(thunkAPI.getState().wine.wineParams);
    try {
      // cancelToken
      const source = axios.CancelToken.source();
      thunkAPI.signal.addEventListener("abort", () => {
        source.cancel();
      });

      // fetch wine
      const response = await api.Wine.allWine(params, {
        cancelToken: source.token,
      });

      // set pagination information
      thunkAPI.dispatch(setMetaData(response.metaData));
      return response.items;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

/* 
  By id
 */
export const getWineById = createAsyncThunk<Wine, number>(
  `${namespace}/getWineById`,
  async (wineId, thunkAPI) => {
    try {
      return await api.Wine.getWineById(wineId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);
