// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import marketDataReducer from "./slices/marketDataSlice";

export const store = configureStore({
  reducer: {
    marketData: marketDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
