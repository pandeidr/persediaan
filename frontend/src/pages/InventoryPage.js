import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const InventoryPage = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Inventory
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This page is under development. Inventory functionality will be implemented here.
        </Typography>
      </Box>
    </Container>
  );
};

export default InventoryPage;
