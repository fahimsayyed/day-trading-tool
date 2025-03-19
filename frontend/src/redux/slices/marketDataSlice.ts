// src/redux/slices/marketDataSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import marketDataApi, { StockData } from "../../api/marketDataApi";

// Define the state interface
interface MarketDataState {
  currentSymbol: string;
  currentInterval: string;
  currentRange: string;
  stockData: StockData | null;
  loading: boolean;
  error: string | null;
}

// Define initial state
const initialState: MarketDataState = {
  currentSymbol: "AAPL",
  currentInterval: "1d",
  currentRange: "3mo",
  stockData: null,
  loading: false,
  error: null,
};

// Create async thunk for fetching stock data
export const fetchStockData = createAsyncThunk(
  "marketData/fetchStockData",
  async ({
    symbol,
    interval,
    range,
  }: {
    symbol: string;
    interval: string;
    range: string;
  }) => {
    const response = await marketDataApi.getStockData(symbol, interval, range);
    return response;
  }
);

// Create the market data slice
const marketDataSlice = createSlice({
  name: "marketData",
  initialState,
  reducers: {
    setCurrentSymbol: (state, action: PayloadAction<string>) => {
      state.currentSymbol = action.payload;
    },
    setCurrentInterval: (state, action: PayloadAction<string>) => {
      state.currentInterval = action.payload;
    },
    setCurrentRange: (state, action: PayloadAction<string>) => {
      state.currentRange = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchStockData.fulfilled,
        (state, action: PayloadAction<StockData>) => {
          state.loading = false;
          state.stockData = action.payload;
        }
      )
      .addCase(fetchStockData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch stock data";
      });
  },
});

// Export actions and reducer
export const { setCurrentSymbol, setCurrentInterval, setCurrentRange } =
  marketDataSlice.actions;
export default marketDataSlice.reducer;
