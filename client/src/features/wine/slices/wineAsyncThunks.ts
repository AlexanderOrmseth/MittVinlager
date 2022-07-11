import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../app/api/api";

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
