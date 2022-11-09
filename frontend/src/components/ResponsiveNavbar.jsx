import {useState} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemLink from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EngineeringIcon from '@mui/icons-material/Engineering';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MapIcon from '@mui/icons-material/Map';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { AppBar } from '@mui/material';

import {useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'

const drawerWidth = 240;

function ResponsiveNavbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moduleName, setModuleName] = useState("")

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const dispatch = useDispatch()
  const onLogout = () => {
      dispatch(logout())
      dispatch(reset())        
  }


  const menuList = [
        {
            name: 'Area',
            icon: <LocationOnIcon/>,
            link: 'arealist'
        },
        {
            name: 'Manpower',
            icon: <EngineeringIcon/>,
            link: 'manpowerlist'
        },
        {
            name: 'Truck',
            icon: <LocalShippingIcon/>,
            link: 'trucklist'
        },
        {
            name: 'Schedule',
            icon: <CalendarMonthIcon/>,
            link: 'schedulelist'
        },
        {
            name: 'Map',
            icon: <MapIcon/>,
            link: 'map'
        }    
    ];  

    const drawer = (
        <div>      
        <Toolbar />
        <Divider />
        <List>
            {menuList.map((menuItem, index) => (
            <ListItem key={menuItem.name} disablePadding>                
                <ListItemLink to={menuItem.link} onClick={()=>{setModuleName(menuItem.name)}}>
                    <ListItemIcon>{menuItem.icon}</ListItemIcon>
                    <ListItemText primary={menuItem.name} />
              </ListItemLink>
            </ListItem>
            ))}            
        </List>
        <Divider />
        <List>
            <ListItem key="Logout" disablePadding>
                <ListItemButton  onClick={onLogout}>
                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                    <ListItemText primary="Logout"/>
                </ListItemButton>
            </ListItem>
        </List>
        </div>
    );

  const container = window !== undefined ? () => window().document.body : undefined;



  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" sx={{width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` },}}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {moduleName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}

ResponsiveNavbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveNavbar;
