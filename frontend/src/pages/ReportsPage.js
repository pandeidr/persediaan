import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const ReportsPage = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Reports
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This page is under development. Reports functionality will be implemented here.
        </Typography>
      </Box>
    </Container>
  );
};

export default ReportsPage;
