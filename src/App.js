import React from 'react';
import { Landing, Error, Register, ProtectedRoute } from './pages';
import {AllJobs, SharedLayout, Stats, AddJob, Profile } from './pages/dashboard';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={
                <ProtectedRoute>
                  <SharedLayout />
                </ProtectedRoute>
                  }>
              <Route index element={<Stats />}/>
              <Route path='profile' element={<Profile />}/>
              <Route path='alljobs' element={<AllJobs />}/>
              <Route path='addjob' element={<AddJob />}/>
          </Route>
          <Route path='landing' element={<Landing />}/>
          <Route path='register' element={<Register />}/>
          <Route path='*' element={<Error />}/>
        </Routes>
        <ToastContainer position='top-center'/>
    </BrowserRouter>
  )
}

export default App;


// get images from undraw.co