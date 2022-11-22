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
import Unavailability from './pages/Truck/Unavailability'; 
import UnavailabilityList from './pages/Truck/UnavailabilityList';
import AddUnavailability from './pages/Truck/AddUnvailability';


//Manpower
import Manpower from './pages/Manpower/Manpower';
import ManpowerList from './pages/Manpower/ManpowerList';
import AddManpower from './pages/Manpower/AddManpower';
import AddLeave from './pages/Manpower/AddLeave';
import LeaveList from './pages/Manpower/LeaveList';
import Leave from './pages/Manpower/Leave';

//Schedule
import ScheduleList from './pages/Schedule/ScheduleList';
import Schedule from './pages/Schedule/Schedule';

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
          <Route path='/area/list' element={<PrivateRoute><AreaList /></PrivateRoute>}></Route>
          <Route path='/area/add' element={<PrivateRoute><AddArea /></PrivateRoute>}></Route>
          <Route path='/area/:id' element={<PrivateRoute><Area /></PrivateRoute>}></Route>

          <Route path='/truck/unavailability/list' element={<PrivateRoute><UnavailabilityList /></PrivateRoute>}></Route>
          <Route path='/truck/unavailability/add' element={<PrivateRoute><AddUnavailability /></PrivateRoute>}></Route>
          <Route path='/truck/unavailability/:id' element={<PrivateRoute><Unavailability /></PrivateRoute>}></Route>
          <Route path='/truck/list' element={<PrivateRoute><TruckList /></PrivateRoute>}></Route>
          <Route path='/truck/add' element={<PrivateRoute><AddTruck /></PrivateRoute>}></Route>
          <Route path='/truck/:id' element={<PrivateRoute><Truck /></PrivateRoute>}></Route>

          <Route path='/manpower/leave/add' element={<PrivateRoute><AddLeave /></PrivateRoute>}></Route>
          <Route path='/manpower/leave/list' element={<PrivateRoute><LeaveList /></PrivateRoute>}></Route>
          <Route path='/manpower/leave/:id' element={<PrivateRoute><Leave /></PrivateRoute>}></Route>
          <Route path='/manpower/list' element={<PrivateRoute><ManpowerList /></PrivateRoute>}></Route>
          <Route path='/manpower/add' element={<PrivateRoute><AddManpower /></PrivateRoute>}></Route>
          <Route path='/manpower/:id' element={<PrivateRoute><Manpower /></PrivateRoute>}></Route>

          <Route path='/schedule/list' element={<PrivateRoute><ScheduleList /></PrivateRoute>}></Route>          
          <Route path='/schedule' element={<PrivateRoute><Schedule /></PrivateRoute>}></Route>
          
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
