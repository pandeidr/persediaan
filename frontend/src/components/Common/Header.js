import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Divider,
  Badge
} from '@mui/material';
import {
  Notifications as NotificationIcon,
  AccountCircle as AccountIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate('/settings/profile');
    handleClose();
  };

  const handleSettings = () => {
    navigate('/settings');
    handleClose();
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      {/* Page Title - will be dynamic based on current route */}
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Welcome back, {user?.first_name}!
      </Typography>

      {/* Header Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* Notifications */}
        <IconButton
          size="large"
          color="inherit"
          aria-label="notifications"
        >
          <Badge badgeContent={3} color="error">
            <NotificationIcon />
          </Badge>
        </IconButton>

        {/* User Menu */}
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'primary.main',
              fontSize: '0.875rem'
            }}
          >
            {user?.first_name?.charAt(0)}{user?.last_name?.charAt(0)}
          </Avatar>
        </IconButton>

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200
            }
          }}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {user?.first_name} {user?.last_name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {user?.email}
            </Typography>
          </Box>
          
          <Divider />
          
          <MenuItem onClick={handleProfile}>
            <AccountIcon sx={{ mr: 2 }} />
            Profile
          </MenuItem>
          
          <MenuItem onClick={handleSettings}>
            <SettingsIcon sx={{ mr: 2 }} />
            Settings
          </MenuItem>
          
          <Divider />
          
          <MenuItem onClick={handleLogout}>
            <LogoutIcon sx={{ mr: 2 }} />
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;