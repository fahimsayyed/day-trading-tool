// src/pages/Settings.tsx
import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Switch,
  FormControlLabel,
  Divider,
} from "@mui/material";

const Settings: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Display Settings
          </Typography>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Dark Mode"
          />
          <FormControlLabel control={<Switch />} label="Show Volume" />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Show Grid Lines"
          />

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Data Settings
          </Typography>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Auto-refresh Data"
          />
          <FormControlLabel
            control={<Switch />}
            label="Include Pre/Post Market"
          />

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Notification Settings
          </Typography>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Price Alerts"
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Pattern Alerts"
          />
          <FormControlLabel control={<Switch />} label="News Alerts" />
        </Paper>
      </Box>
    </Container>
  );
};

export default Settings;
