// index.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

// Create Express app
const app = express();
const httpServer = http.createServer(app);

// Initialize Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Simple market data endpoint for testing
app.get("/api/market-data/stock", (req, res) => {
  const { symbol = "AAPL" } = req.query;

  // Generate sample data
  const data = generateSampleStockData(symbol, "1d", "3mo");

  res.json(data);
});

// Socket.io connection handler
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Generate sample stock data for prototype
function generateSampleStockData(symbol, interval, range) {
  const now = new Date();
  const data = {
    symbol: symbol,
    interval: interval,
    range: range,
    timestamp: [],
    open: [],
    high: [],
    low: [],
    close: [],
    volume: [],
  };

  // Number of data points
  let dataPoints = 90;

  // Generate random price data
  let basePrice =
    symbol === "AAPL"
      ? 150
      : symbol === "MSFT"
      ? 300
      : symbol === "GOOGL"
      ? 2500
      : 100;

  let currentPrice = basePrice;

  for (let i = dataPoints; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);

    // Add some randomness to price
    const changePercent = (Math.random() - 0.5) * 2; // -1% to +1%
    currentPrice = currentPrice * (1 + changePercent / 100);

    const dailyVolatility = currentPrice * 0.02; // 2% volatility

    const open = currentPrice;
    const close = currentPrice * (1 + (Math.random() - 0.5) * 0.01);
    const high = Math.max(open, close) + Math.random() * dailyVolatility;
    const low = Math.min(open, close) - Math.random() * dailyVolatility;
    const volume = Math.floor(Math.random() * 10000000) + 1000000;

    data.timestamp.push(date.getTime());
    data.open.push(open);
    data.high.push(high);
    data.low.push(low);
    data.close.push(close);
    data.volume.push(volume);

    currentPrice = close;
  }

  return data;
}

// Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
