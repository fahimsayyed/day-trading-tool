// src/api/marketDataApi.ts
import axios from "axios";

// Define the base URL for API calls
const API_URL = "http://localhost:5000/api";

// Define interfaces for the data structures
export interface StockData {
  symbol: string;
  interval: string;
  range: string;
  timestamp: number[];
  open: number[];
  high: number[];
  low: number[];
  close: number[];
  volume: number[];
}

// Create the API service
const marketDataApi = {
  // Get stock data for a specific symbol
  getStockData: async (
    symbol: string,
    interval: string = "1d",
    range: string = "3mo"
  ): Promise<StockData> => {
    try {
      const response = await axios.get(`${API_URL}/market-data/stock`, {
        params: { symbol, interval, range },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching stock data:", error);
      throw error;
    }
  },
};

export default marketDataApi;
