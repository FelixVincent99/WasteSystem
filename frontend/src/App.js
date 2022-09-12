import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import PrivateRoute from './components/PrivateRoute';
import ResponsiveNavbar from './components/ResponsiveNavbar';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateUser from './pages/User/CreateUser';

//area
import Area from './pages/Area/Area';

function App() {  

  const {user} = useSelector((state)=> state.auth)

  return (
    <>
      {/* {user ? <SideNavbar /> : <></>} */}
      <Router>
        {user ? <ResponsiveNavbar /> : <></>}
        <Routes>
          <Route path='/area' element={<PrivateRoute><Area /></PrivateRoute>}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>}></Route>
          <Route path='/create-user' element={<PrivateRoute><CreateUser /></PrivateRoute>}></Route>
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
      </Router>
      <ToastContainer />
    </>  
  );
}

export default App;
