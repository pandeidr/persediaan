import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Avatar
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Receipt as InvoiceIcon,
  ShoppingCart as PurchaseOrderIcon,
  Inventory as InventoryIcon,
  People as CustomerIcon,
  Business as VendorIcon,
  AccountBalance as FinancialIcon,
  Assessment as ReportsIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

import { useAuth } from '../../contexts/AuthContext';

const menuItems = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard',
    roles: ['admin', 'accountant', 'sales', 'inventory', 'viewer']
  },
  {
    text: 'Invoicing',
    icon: <InvoiceIcon />,
    path: '/invoicing',
    roles: ['admin', 'accountant', 'sales']
  },
  {
    text: 'Purchase Orders',
    icon: <PurchaseOrderIcon />,
    path: '/purchase-orders',
    roles: ['admin', 'accountant', 'inventory']
  },
  {
    text: 'Inventory',
    icon: <InventoryIcon />,
    path: '/inventory',
    roles: ['admin', 'accountant', 'inventory']
  },
  {
    text: 'Customers',
    icon: <CustomerIcon />,
    path: '/customers',
    roles: ['admin', 'accountant', 'sales']
  },
  {
    text: 'Vendors',
    icon: <VendorIcon />,
    path: '/vendors',
    roles: ['admin', 'accountant', 'inventory']
  },
  {
    text: 'Financial',
    icon: <FinancialIcon />,
    path: '/financial',
    roles: ['admin', 'accountant']
  },
  {
    text: 'Reports',
    icon: <ReportsIcon />,
    path: '/reports',
    roles: ['admin', 'accountant', 'sales', 'inventory', 'viewer']
  },
  {
    text: 'Settings',
    icon: <SettingsIcon />,
    path: '/settings',
    roles: ['admin', 'accountant']
  }
];

const Sidebar = ({ onItemClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, company } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
    if (onItemClick) {
      onItemClick();
    }
  };

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role)
  );

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo and Company Info */}
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'primary.main',
              mr: 2
            }}
          >
            {company?.name?.charAt(0) || 'P'}
          </Avatar>
          <Box>
            <Typography variant="h6" component="div" noWrap>
              Persediaan
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {company?.name || 'Accounting Software'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
        <List sx={{ pt: 1 }}>
          {filteredMenuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  selected={isActive}
                  sx={{
                    mx: 1,
                    mb: 0.5,
                    borderRadius: 1,
                    '&.Mui-selected': {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                      }
                    }
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isActive ? 'inherit' : 'text.secondary'
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 500 : 400
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* User Info */}
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'secondary.main',
              mr: 2,
              fontSize: '0.875rem'
            }}
          >
            {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
          </Avatar>
          <Box sx={{ minWidth: 0, flexGrow: 1 }}>
            <Typography variant="body2" noWrap>
              {user?.first_name} {user?.last_name}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;