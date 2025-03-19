// src/App.tsx

import React, { ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Dashboard from "./pages/Dashboard";
import ChartAnalysis from "./pages/ChartAnalysis";
import RiskManagement from "./pages/RiskManagement";
import Backtesting from "./pages/Backtesting";
import Settings from "./pages/Settings";

// Simple Layout component with proper TypeScript types
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div>
    <div
      style={{
        backgroundColor: "#333",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <h2>Day Trading Tool</h2>
      <nav>
        <a href="/" style={{ color: "white", marginRight: "15px" }}>
          Dashboard
        </a>
        <a href="/chart" style={{ color: "white", marginRight: "15px" }}>
          Charts
        </a>
        <a href="/risk" style={{ color: "white", marginRight: "15px" }}>
          Risk
        </a>
        <a href="/backtest" style={{ color: "white", marginRight: "15px" }}>
          Backtest
        </a>
        <a href="/settings" style={{ color: "white" }}>
          Settings
        </a>
      </nav>
    </div>
    <div>{children}</div>
  </div>
);

// Create a theme
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/chart"
              element={
                <Layout>
                  <ChartAnalysis />
                </Layout>
              }
            />
            <Route
              path="/risk"
              element={
                <Layout>
                  <RiskManagement />
                </Layout>
              }
            />
            <Route
              path="/backtest"
              element={
                <Layout>
                  <Backtesting />
                </Layout>
              }
            />
            <Route
              path="/settings"
              element={
                <Layout>
                  <Settings />
                </Layout>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
