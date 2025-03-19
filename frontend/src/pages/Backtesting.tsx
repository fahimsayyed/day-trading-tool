// src/pages/Backtesting.tsx
import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";

const Backtesting: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Backtesting
        </Typography>

        <Paper sx={{ p: 3 }}>
          <Typography variant="body1">
            This is the Backtesting page. Here you will be able to test trading
            strategies against historical data.
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Features coming soon:
          </Typography>
          <ul>
            <li>Strategy definition</li>
            <li>Historical data simulation</li>
            <li>Performance metrics</li>
            <li>Optimization tools</li>
          </ul>
        </Paper>
      </Box>
    </Container>
  );
};

export default Backtesting;
