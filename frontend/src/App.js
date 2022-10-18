import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Box } from '@mui/system';
import { Toolbar } from '@mui/material';

import PrivateRoute from './components/PrivateRoute';
import ResponsiveNavbar from './components/ResponsiveNavbar';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateUser from './pages/User/CreateUser';

//area module
import AreaList from './pages/Area/AreaList'
import AddArea from './pages/Area/AddArea';
import Area from './pages/Area/Area'


//truck module
import TruckList from './pages/Truck/TruckList';
import AddTruck from './pages/Truck/AddTruck';
import Truck from './pages/Truck/Truck';

function App() {  

  const {user} = useSelector((state)=> state.auth)
  const drawerWidth = 240;

  return (
    <Box sx={{ display: 'flex' }}>
      {/* {user ? <SideNavbar /> : <></>} */}
      <Router>
        {user ? <ResponsiveNavbar /> : <></>}
        <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Routes>
          <Route path='/arealist' element={<PrivateRoute><AreaList /></PrivateRoute>}></Route>
          <Route path='/addarea' element={<PrivateRoute><AddArea /></PrivateRoute>}></Route>
          <Route path='/area/:id' element={<PrivateRoute><Area /></PrivateRoute>}></Route>

          <Route path='/trucklist' element={<PrivateRoute><TruckList /></PrivateRoute>}></Route>
          <Route path='/addtruck' element={<PrivateRoute><AddTruck /></PrivateRoute>}></Route>
          <Route path='/truck/:id' element={<PrivateRoute><Truck /></PrivateRoute>}></Route>

          <Route path='/login' element={<Login />}></Route>
          <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>}></Route>
          <Route path='/create-user' element={<PrivateRoute><CreateUser /></PrivateRoute>}></Route>
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
        </Box>
      </Router>
      <ToastContainer />
    </Box>  
  );
}

export default App;
