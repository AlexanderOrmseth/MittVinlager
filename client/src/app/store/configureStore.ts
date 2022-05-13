import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// import slices
import { accountSlice } from "../../features/account/accountSlice";
import { wineSlice } from "../../features/wine/slices/wineSlice";

export const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    wine: wineSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
