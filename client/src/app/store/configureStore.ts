import { wineApi } from "../services/wineApi";
import { themeSlice } from "../../features/ui/themeSlice";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { api } from "../services/api";
import { wineSlice } from "../../features/wine/wineSlice";
import { accountSlice } from "../../features/account/accountSlice";

export const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    wine: wineSlice.reducer,
    theme: themeSlice.reducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(wineApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
