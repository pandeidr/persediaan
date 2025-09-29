import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Paper,
  Avatar
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Receipt as ReceiptIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  Inventory as InventoryIcon
} from '@mui/icons-material';

const StatCard = ({ title, value, change, changeType, icon, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography color="text.secondary" gutterBottom variant="h6">
            {title}
          </Typography>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            {changeType === 'up' ? (
              <TrendingUpIcon sx={{ color: 'success.main', mr: 0.5 }} />
            ) : (
              <TrendingDownIcon sx={{ color: 'error.main', mr: 0.5 }} />
            )}
            <Typography 
              variant="body2" 
              sx={{ 
                color: changeType === 'up' ? 'success.main' : 'error.main',
                fontWeight: 500
              }}
            >
              {change}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
              vs last month
            </Typography>
          </Box>
        </Box>
        <Avatar
          sx={{
            bgcolor: color,
            width: 56,
            height: 56
          }}
        >
          {icon}
        </Avatar>
      </Box>
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  // Mock data - will be replaced with real API calls
  const stats = [
    {
      title: 'Total Revenue',
      value: '$127,850',
      change: '+12.5%',
      changeType: 'up',
      icon: <TrendingUpIcon />,
      color: 'primary.main'
    },
    {
      title: 'Pending Invoices',
      value: '23',
      change: '+5.2%',
      changeType: 'up',
      icon: <ReceiptIcon />,
      color: 'warning.main'
    },
    {
      title: 'Active Customers',
      value: '156',
      change: '+8.1%',
      changeType: 'up',
      icon: <PeopleIcon />,
      color: 'success.main'
    },
    {
      title: 'Low Stock Items',
      value: '7',
      change: '-15.3%',
      changeType: 'down',
      icon: <InventoryIcon />,
      color: 'error.main'
    }
  ];

  const recentActivities = [
    { id: 1, type: 'invoice', description: 'New invoice #INV-2024-0001 created for ABC Corp', time: '2 hours ago' },
    { id: 2, type: 'payment', description: 'Payment received for invoice #INV-2024-0002', time: '4 hours ago' },
    { id: 3, type: 'stock', description: 'Stock alert: Product ABC123 is running low', time: '6 hours ago' },
    { id: 4, type: 'order', description: 'Purchase order #PO-2024-0005 approved', time: '1 day ago' },
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to your accounting dashboard. Here's an overview of your business.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Chart Placeholder */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Revenue Trend
            </Typography>
            <Box
              sx={{
                height: 320,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.50',
                borderRadius: 1
              }}
            >
              <Typography color="text.secondary">
                Chart will be implemented here (Revenue over time)
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <Box sx={{ maxHeight: 320, overflow: 'auto' }}>
              {recentActivities.map((activity) => (
                <Box key={activity.id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    {activity.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {activity.time}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              {[
                { title: 'Create Invoice', description: 'Generate a new invoice for customers' },
                { title: 'Add Purchase Order', description: 'Create new purchase order for vendors' },
                { title: 'Record Payment', description: 'Record payment received from customers' },
                { title: 'Stock Adjustment', description: 'Adjust inventory stock levels' },
              ].map((action, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 3
                      }
                    }}
                  >
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        {action.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {action.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;