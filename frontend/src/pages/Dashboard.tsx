// src/pages/Dashboard.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Box,
  Paper,
  CircularProgress,
  Button,
  ButtonGroup,
} from "@mui/material";
import { RootState } from "../redux/store";
import {
  fetchStockData,
  setCurrentInterval,
  setCurrentRange,
} from "../redux/slices/marketDataSlice";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<any>();

  // Use optional chaining to safely access state properties
  const marketData = useSelector((state: RootState) => state.marketData);

  // Safely access properties with defaults if marketData is undefined
  const currentSymbol = marketData?.currentSymbol || "AAPL";
  const currentInterval = marketData?.currentInterval || "1d";
  const currentRange = marketData?.currentRange || "3mo";
  const stockData = marketData?.stockData;
  const loading = marketData?.loading || false;
  const error = marketData?.error;

  useEffect(() => {
    // Fetch stock data when component mounts
    dispatch(
      fetchStockData({
        symbol: currentSymbol,
        interval: currentInterval,
        range: currentRange,
      })
    );
  }, [dispatch, currentSymbol, currentInterval, currentRange]);

  const handleIntervalChange = (interval: string) => {
    dispatch(setCurrentInterval(interval));
  };

  const handleRangeChange = (range: string) => {
    dispatch(setCurrentRange(range));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Day Trading Tool Dashboard
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6">{currentSymbol} Chart</Typography>
            <Box>
              <ButtonGroup size="small" sx={{ mr: 2 }}>
                <Button
                  variant={currentInterval === "1d" ? "contained" : "outlined"}
                  onClick={() => handleIntervalChange("1d")}
                >
                  1D
                </Button>
                <Button
                  variant={currentInterval === "1wk" ? "contained" : "outlined"}
                  onClick={() => handleIntervalChange("1wk")}
                >
                  1W
                </Button>
                <Button
                  variant={currentInterval === "1mo" ? "contained" : "outlined"}
                  onClick={() => handleIntervalChange("1mo")}
                >
                  1M
                </Button>
              </ButtonGroup>

              <ButtonGroup size="small">
                <Button
                  variant={currentRange === "1mo" ? "contained" : "outlined"}
                  onClick={() => handleRangeChange("1mo")}
                >
                  1M
                </Button>
                <Button
                  variant={currentRange === "3mo" ? "contained" : "outlined"}
                  onClick={() => handleRangeChange("3mo")}
                >
                  3M
                </Button>
                <Button
                  variant={currentRange === "1y" ? "contained" : "outlined"}
                  onClick={() => handleRangeChange("1y")}
                >
                  1Y
                </Button>
              </ButtonGroup>
            </Box>
          </Box>

          {loading ? (
            <Box display="flex" justifyContent="center" p={3}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box p={3}>
              <Typography color="error">Error: {error}</Typography>
            </Box>
          ) : stockData ? (
            <Box>
              <Typography variant="body1">
                Latest price: $
                {stockData.close[stockData.close.length - 1].toFixed(2)}
              </Typography>
              <Typography variant="body2">
                Data points: {stockData.timestamp.length}
              </Typography>
              <Box mt={2}>
                <pre style={{ overflow: "auto", maxHeight: "200px" }}>
                  {JSON.stringify(stockData, null, 2)}
                </pre>
              </Box>
            </Box>
          ) : (
            <Box p={3}>
              <Typography>
                No data available. Make sure your backend API is running.
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;
