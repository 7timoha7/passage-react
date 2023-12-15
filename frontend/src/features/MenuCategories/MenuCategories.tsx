import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCategories } from './menuCategoriesSlice';
import { fetchCategories } from './menuCategoriesThunks';

const drawerWidth = 240;

const MenuCategories = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const drawer = (
    <>
      {categories.map((item) => {
        return (
          <Button
            key={item._id}
            onClick={() => navigate('products/' + item._id)}
            sx={{ backgroundColor: 'rgb(0,0,0)', m: 2 }}
          >
            {item.name}
          </Button>
        );
      })}
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{
          width: { lg: drawerWidth },
          flexShrink: { sm: 0 },
          background: 'linear-gradient(270deg, rgb(47, 36, 36), rgb(204, 43, 43))',
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              background: 'linear-gradient(270deg, rgb(47, 36, 36), rgb(204, 43, 43))',
            },
            '& .MuiDrawer-paperAnchorLeft': {
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              position: 'unset',
              background: 'rgba(47,36,36,0)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, pl: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { lg: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MenuCategories;
