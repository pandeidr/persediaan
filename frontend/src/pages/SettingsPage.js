import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const SettingsPage = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This page is under development. Settings functionality will be implemented here.
        </Typography>
      </Box>
    </Container>
  );
};

export default SettingsPage;
